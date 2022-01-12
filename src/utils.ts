export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function makeTrailerPath(key ?: string) {
  return `https://www.youtube.com/watch?v=${key}`
}
