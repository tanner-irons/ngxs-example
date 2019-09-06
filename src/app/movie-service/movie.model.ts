export interface MovieDetails {
  title: string
  year: string
  rated: string
  released: string
  runtime: string
  Genre: string
  director: string
  writer: string
  actors: string
  plot: string
  language: string
  country: string
  awards: string
  poster: string
  ratings: { source: string, value: string }[],
  metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  type: string
  DVD: string
  boxOffice: string
  production: string
  website: string
  response: string
}

export interface MovieSummary {
  Title: string,
  Year: string,
  imdbID: string,
  Type: 'movie' | 'series' | 'episode',
  Poster: string
}
