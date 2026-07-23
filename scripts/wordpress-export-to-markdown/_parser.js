import fs from 'fs';
import { DateTime } from 'luxon';
import xml2js from 'xml2js';
import * as shared from './_shared.js';
import * as translator from './_translator.js';

export async function parseFilePromise (config) {
  console.log('\nParsing...')
  const content = await fs.promises.readFile(config.input, 'utf8')
  const data = await xml2js.parseStringPromise(content, {
    trim: true,
    tagNameProcessors: [xml2js.processors.stripPrefix]
  })

  const posts = collectPosts(data, config)

  const images = []
  if (config.saveAttachedImages) {
    images.push(...collectAttachedImages(data))
  }
  if (config.saveScrapedImages) {
    images.push(...collectScrapedImages(data))
  }

  mergeImagesIntoPosts(images, posts)

  return posts
}

function getItemsOfType (data, type) {
  return data.rss.channel[0].item.filter(item => item.post_type[0] === type)
}

function collectPosts (data, config) {
  const posts = getItemsOfType(data, 'post')
    .filter(post => post.status[0] !== 'trash' && post.status[0] !== 'draft')
    .map(post => createPost(post, config))

  console.log(posts.length + ' posts found.')
  return posts
}

function createPost (post, config) {
  const permalink = getPermalink(post)
  const format = getPostFormat(post)
  const postMeta = getPostMetaEntries(post)
  const externalUrl = format === 'link'
    ? getFirstHttpUrl(postMeta, 'linked_list_url', permalink)
    : undefined
  const shortUrl = getFirstHttpUrl(postMeta, 'yourls_shorturl', permalink)
  const contentCopy = getContentCopy(postMeta, permalink)
  const geo = getPublicGeo(postMeta)

  const frontmatter = {
    title: getPostTitle(post),
    date: getPostDate(post),
    published_at: getPublishedAt(post),
    id: getPostId(post),
    slug: getPostSlug(post),
    permalink,
    author: getPostAuthor(post),
    format
  }

  addArrayIfNotEmpty(frontmatter, 'categories', getTerms(post, 'category'))
  addArrayIfNotEmpty(frontmatter, 'tags', getTerms(post, 'post_tag'))
  addIfDefined(frontmatter, 'external_url', externalUrl)
  addIfDefined(frontmatter, 'short_url', shortUrl)
  addArrayIfNotEmpty(frontmatter, 'content_copy', contentCopy)
  Object.assign(frontmatter, geo)

  return {
    // Internal data used for paths and optional image downloads only.
    meta: {
      id: getPostId(post),
      slug: getPostSlug(post),
      coverImageId: getPostCoverImageId(post),
      imageUrls: []
    },
    frontmatter,
    content: translator.getPostContent(post, {
      permalink,
      format,
      externalUrl,
      config
    })
  }
}

function getPostId (post) {
  return post.post_id[0]
}

function getPostSlug (post) {
  return post.post_name[0]
}

function getPostCoverImageId (post) {
  if (post.postmeta === undefined) {
    return undefined
  }

  const postmeta = post.postmeta.find(postmeta => postmeta.meta_key[0] === '_thumbnail_id')
  const id = postmeta ? postmeta.meta_value[0] : undefined
  return id
}

function getPostTitle (post) {
  return post.title[0]
}

function getPostDate (post) {
  const date = DateTime.fromSQL(String(post.post_date[0]), { zone: 'Europe/Berlin' })
  if (!date.isValid) {
    throw new Error(`Invalid local post date for post ${getPostId(post)}: ${post.post_date[0]}`)
  }
  return date.toISODate()
}

function getPublishedAt (post) {
  const gmtValue = String(post.post_date_gmt?.[0] || '')
  let date = DateTime.fromSQL(gmtValue, { zone: 'utc' })

  if (!date.isValid || date.year === 0) {
    date = DateTime.fromSQL(String(post.post_date[0]), { zone: 'Europe/Berlin' }).toUTC()
  }

  if (!date.isValid) {
    throw new Error(`Invalid publication date for post ${getPostId(post)}`)
  }

  return date.toUTC().toISO({ suppressMilliseconds: true })
}

function getPermalink (post) {
  const date = post.post_date + ''
  return `https://eay.cc/${date.substring(0, 4)}/${getPostSlug(post)}/`
}

function getPostAuthor (post) {
  const author = String(post.creator[0]).trim()
  return author === 'eay' || author === 'Stefan' ? 'Stefan Grund' : author
}

function getPostFormat (post) {
  const format = (post.category || []).find(item => item.$?.domain === 'post_format')
  return format == null ? 'standard' : format.$.nicename.replace('post-format-', '')
}

function getTerms (post, domain) {
  return (post.category || [])
    .filter(item => item.$?.domain === domain)
    .map(item => typeof item === 'string' ? item : item._)
    .map(item => String(item || '').trim())
    .filter(Boolean)
}

function getPostMetaEntries (post) {
  return (post.postmeta || []).map(item => ({
    key: String(item.meta_key?.[0] || ''),
    value: String(item.meta_value?.[0] || '').trim()
  }))
}

function getFirstHttpUrl (entries, key, baseUrl) {
  for (const entry of entries) {
    if (entry.key !== key) continue
    const url = getHttpUrl(entry.value, baseUrl)
    if (url) return url
  }
  return undefined
}

function getHttpUrl (value, baseUrl) {
  if (!/^(?:https?:)?\/\//i.test(value)) return undefined
  try {
    const url = new URL(value, baseUrl)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : undefined
  } catch {
    return undefined
  }
}

function getContentCopy (entries, baseUrl) {
  const values = [
    ...entries.filter(entry => entry.key === 'content_copy'),
    ...entries.filter(entry => entry.key === '_share_on_mastodon_url')
  ]
    .map(entry => getHttpUrl(entry.value, baseUrl))
    .filter(Boolean)

  return [...new Set(values)]
}

function getPublicGeo (entries) {
  if (!entries.some(entry => entry.key === 'geo_public' && entry.value === '1')) {
    return {}
  }

  const latitudes = entries.filter(entry => entry.key === 'geo_latitude').map(entry => entry.value)
  const longitudes = entries.filter(entry => entry.key === 'geo_longitude').map(entry => entry.value)
  let coordinates

  for (let index = 0; index < Math.min(latitudes.length, longitudes.length); index++) {
    if (isValidCoordinatePair(latitudes[index], longitudes[index])) {
      coordinates = [latitudes[index], longitudes[index]]
      break
    }
  }

  if (!coordinates) return {}

  const geo = {
    geo_latitude: coordinates[0],
    geo_longitude: coordinates[1]
  }
  const address = entries.find(entry => entry.key === 'geo_address' && entry.value)?.value
  addIfDefined(geo, 'geo_address', address)
  return geo
}

function isValidCoordinatePair (latitude, longitude) {
  const lat = Number(latitude)
  const lon = Number(longitude)
  return Number.isFinite(lat) && Number.isFinite(lon) &&
    lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180 &&
    !(lat === 0 && lon === 0)
}

function addIfDefined (target, key, value) {
  if (value !== undefined) target[key] = value
}

function addArrayIfNotEmpty (target, key, value) {
  if (value.length > 0) target[key] = value
}

function collectAttachedImages (data) {
  const images = getItemsOfType(data, 'attachment')
  // filter to certain image file types
    .filter(attachment => (/\.(gif|jpe?g|png)$/i).test(attachment.attachment_url[0]))
    .map(attachment => ({
      id: attachment.post_id[0],
      postId: attachment.post_parent[0],
      url: attachment.attachment_url[0]
    }))

  console.log(images.length + ' attached images found.')
  return images
}

function collectScrapedImages (data) {
  const images = []
  getItemsOfType(data, 'post').forEach(post => {
    const postId = post.post_id[0]
    const postContent = post.encoded[0]
    const postLink = post.link[0]

    const matches = [...postContent.matchAll(/<img[^>]*src="(.+?\.(?:gif|jpe?g|png))"[^>]*>/gi)]
    matches.forEach(match => {
      // base the matched image URL relative to the post URL
      const url = new URL(match[1], postLink).href

      images.push({
        id: -1,
        postId: postId,
        url: url
      })
    })
  })

  console.log(images.length + ' images scraped from post body content.')
  return images
}

function mergeImagesIntoPosts (images, posts) {
  // create lookup table for quicker traversal
  const postsLookup = posts.reduce((lookup, post) => {
    lookup[post.meta.id] = post
    return lookup
  }, {})

  images.forEach(image => {
    const post = postsLookup[image.postId]
    if (post) {
      if (image.id === post.meta.coverImageId) {
        // save cover image filename to frontmatter
        post.frontmatter.coverImage = shared.getFilenameFromUrl(image.url)
      }

      // save (unique) full image URLs for downloading later
      if (!post.meta.imageUrls.includes(image.url)) {
        post.meta.imageUrls.push(image.url)
      }
    }
  });
}
