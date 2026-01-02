import chalk from 'chalk';
import fs from 'fs';
import { DateTime } from 'luxon';
import path from 'path';
import * as shared from './_shared.js';

export async function writeFilesPromise (posts, config) {
  await cleanupDeletedPostsPromise(posts, config)
  await writeMarkdownFilesPromise(posts, config)
  await writeImageFilesPromise(posts, config)
}

async function cleanupDeletedPostsPromise (posts, config) {
  console.log('\nChecking for deleted posts...')
  
  // Get all post IDs from the new export
  const newPostIds = new Set(posts.map(post => post.frontmatter.id))
  
  // Find all existing markdown files
  const existingFiles = await findMarkdownFiles(config.output)
  
  // Check each file and collect ones to delete
  const filesToDelete = []
  for (const filePath of existingFiles) {
    try {
      const content = await fs.promises.readFile(filePath, 'utf8')
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1]
        const idMatch = frontmatter.match(/^id:\s*"?(\d+)"?$/m)
        
        if (idMatch) {
          const postId = idMatch[1]
          if (!newPostIds.has(postId)) {
            filesToDelete.push({ path: filePath, id: postId })
          }
        }
      }
    } catch (ex) {
      // Skip files that can't be read
      console.log(chalk.yellow('[SKIP]') + ' Could not read ' + filePath)
    }
  }
  
  // Delete the files
  if (filesToDelete.length > 0) {
    console.log(chalk.yellow(`Found ${filesToDelete.length} deleted post(s) to remove:`))
    for (const file of filesToDelete) {
      try {
        await fs.promises.unlink(file.path)
        console.log(chalk.red('[DELETED]') + ' ' + path.basename(file.path) + ' (ID: ' + file.id + ')')
      } catch (ex) {
        console.log(chalk.red('[FAILED]') + ' Could not delete ' + file.path)
      }
    }
  } else {
    console.log(chalk.green('No deleted posts found.'))
  }
}

async function findMarkdownFiles (dir) {
  const files = []
  
  try {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        const subFiles = await findMarkdownFiles(fullPath)
        files.push(...subFiles)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  } catch (ex) {
    // Directory doesn't exist yet, that's fine
  }
  
  return files
}

async function processPayloadsPromise (payloads, loadFunc, config) {
  const promises = payloads.map(payload => new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const data = await loadFunc(payload.item, config)
        await writeFile(payload.destinationPath, data)
        console.log(chalk.green('[OK]') + ' ' + payload.name)
        resolve()
      } catch (ex) {
        console.log(chalk.red('[FAILED]') + ' ' + payload.name + ' ' + chalk.red('(' + ex.toString() + ')'))
        reject()
      }
    }, payload.delay)
  }))

  const results = await Promise.allSettled(promises)
  const failedCount = results.filter(result => result.status === 'rejected').length
  if (failedCount === 0) {
    console.log('Done, got them all!')
  } else {
    console.log('Done, but with ' + chalk.red(failedCount + ' failed') + '.')
  }
}

async function writeFile (destinationPath, data) {
  await fs.promises.mkdir(path.dirname(destinationPath), { recursive: true })
  await fs.promises.writeFile(destinationPath, data)
}

async function writeMarkdownFilesPromise (posts, config) {
  // package up posts into payloads
  const payloads = posts.map((post, index) => ({
    item: post,
    name: post.meta.slug,
    destinationPath: getPostPath(post, config),
    delay: index * 25
  }))

  console.log('\nSaving posts...')
  await processPayloadsPromise(payloads, loadMarkdownFilePromise, config)
}

async function loadMarkdownFilePromise (post, config) {
  let output = '---\n'
  Object.entries(post.frontmatter).forEach(pair => {
    const key = pair[0]
    const value = pair[1]
    
    if (key === 'title') {
      output += key + ': "' + value.replace(/\\([\s\S])|(")/g, '\\$1$2') + '"\n'
    } else if (key === 'categories' || key === 'tags' || key === 'meta') {
      if (value !== '') {
        output += key + ':\n' + value
      }
    } else {
      output += key + ': "' + value + '"\n'
    }
  })
  output += '---\n\n' + post.content + '\n'
  return output
}

async function writeImageFilesPromise (posts, config) {
  // collect image data from all posts into a single flattened array of payloads
  let delay = 0
  const payloads = posts.flatMap(post => {
    const postPath = getPostPath(post, config)
    const imagesDir = path.join(path.dirname(postPath), 'images')
    return post.meta.imageUrls.map(imageUrl => {
      const filename = shared.getFilenameFromUrl(imageUrl)
      const payload = {
        item: imageUrl,
        name: filename,
        destinationPath: path.join(imagesDir, filename),
        delay
      }
      delay += 100
      return payload
    })
  })

  if (payloads.length > 0) {
    console.log('\nDownloading and saving images...')
    await processPayloadsPromise(payloads, loadImageFilePromise)
  } else {
    console.log('\nNo images to download and save...')
  }
}

async function loadImageFilePromise (imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      const error = new Error(response.status.toString());
      error.statusCode = response.status;
      throw error;
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (ex) {
    if (ex.statusCode) {
      // simplify to just the status code
      ex.message = ex.statusCode.toString();
    }
    throw ex;
  }
}

function getPostPath (post, config) {
  const dt = DateTime.fromISO(post.frontmatter.date);

  // start with base output dir
  const pathSegments = [config.output]

  if (config.yearFolders) {
    pathSegments.push(dt.toFormat('yyyy'))
  }

  if (config.monthFolders) {
    pathSegments.push(dt.toFormat('LL'))
  }

  // create slug fragment, possibly date prefixed
  let slugFragment = post.meta.slug
  if (config.prefixDate) {
    slugFragment = dt.toFormat('yyyy-LL-dd') + '-' + slugFragment
  }

  // use slug fragment as folder or filename as specified
  if (config.postFolders) {
    pathSegments.push(slugFragment, 'index.md')
  } else {
    pathSegments.push(slugFragment + '.md')
  }

  return path.join(...pathSegments);
}
