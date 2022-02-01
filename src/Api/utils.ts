export function makeImagePath(id: string) {
  return `https://image.tmdb.org/t/p/original/${id}`;
}

export function makeTrailerPath(key?: string) {
  return `https://www.youtube.com/embed/${key}?showinfo=0&enablejsapi=1&origin=http://localhost:3000`;  //localhost 제거
}

export const NothingPoster =
  "https://user-images.githubusercontent.com/79081800/150473965-fbc32c06-12b2-4b22-8c75-fba34e923475.jpg";
