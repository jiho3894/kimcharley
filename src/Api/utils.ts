export function makeImagePath(id: string ) {
  return `https://image.tmdb.org/t/p/original/${id}`;
}

export function makeTrailerPath(key ?: string) {
  return `https://www.youtube.com/watch?v=${key}`
}
