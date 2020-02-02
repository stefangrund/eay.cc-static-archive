const fs = require('fs')
const luxon = require('luxon')
const xml2js = require('xml2js')

const shared = require('./_shared')
const translator = require('./_translator')

async function parseFilePromise (config) {
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
  // this is passed into getPostContent() for the markdown conversion
  const turndownService = translator.initTurndownService()

  const posts = getItemsOfType(data, 'post')
    .filter(post => post.status[0] !== 'trash' && post.status[0] !== 'draft')
    .map(post => ({
      // meta data isn't written to file, but is used to help with other things
      meta: {
        id: getPostId(post),
        slug: getPostSlug(post),
        coverImageId: getPostCoverImageId(post),
        imageUrls: []
      },
      frontmatter: {
        title: getPostTitle(post),
        date: getPostDate(post),
        datetime: post.post_date,
        id: getPostId(post),
        slug: getPostSlug(post),
        url: getPermalink(post),
        author: getPostAuthor(post),
        format: getPostFormat(post),
        categories: getCategories(post),
        tags: getTags(post),
        meta: getPostMeta(post)
      },
      content: translator.getPostContent(post, turndownService, config)
    }))

  console.log(posts.length + ' posts found.')
  return posts
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
  return luxon.DateTime.fromRFC2822(post.pubDate[0], { zone: 'utc' }).toISODate()
}

function getPermalink (post) {
  const date = post.post_date + ''
  return `https://eay.cc/${date.substring(0, 4)}/${getPostSlug(post)}/`
}

function getPostAuthor (post) {
  return post.creator[0]
}

function getPostFormat (post) {
  const format = post.category.find(item => item.$.domain === 'post_format')
  return format == null ? 'post' : format.$.nicename.replace('post-format-', '')
}

function getCategories (post) {
  let items = post.category.filter(item => item.$.domain === 'category')
  items = items.map((item) => {
    if (item.$ == null) { return }
    return `  - ${item.$.nicename}\n`
  })
  return items.join('')
}

function getTags (post) {
  let items = post.category.filter(item => item.$.domain === 'post_tag')
  items = items.map((item) => {
    if (item.$ == null) { return }
    return `  - ${item.$.nicename}\n`
  })
  return items.join('')
}

function getPostMeta (post) {
  let items = post.postmeta.map((item) => {
    if (item.meta_key[0].includes('utw_tags') ||
				item.meta_key[0] === 'enclosure' ||
				item.meta_key[0] === '_mini_post' ||
				item.meta_key[0] === '_wp_old_slug' ||
				item.meta_key[0] === '_wp_old_date' ||
				item.meta_key[0] === 'custom_script' ||
				item.meta_key[0] === '_edit_last') {
      return null
    } else {
      return `  - ${item.meta_key[0]}: "${item.meta_value[0]}"\n`
    }
  })
  items = items.filter(item => item != null)
  return items.join('')
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
  })
}

exports.parseFilePromise = parseFilePromise
