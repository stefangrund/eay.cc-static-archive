export function getFilenameFromUrl (url) {
  return url.split('/').slice(-1)[0];
}
