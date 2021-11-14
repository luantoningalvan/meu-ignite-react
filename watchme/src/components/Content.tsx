import { IMovie } from "../interfaces/IMovie";
import { MovieCard } from "./MovieCard";
interface IContent {
  movies: IMovie[];
}

export function Content(props: IContent) {
  const { movies } = props;

  return (
    <main>
      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            runtime={movie.Runtime}
            rating={movie.Ratings[0].Value}
          />
        ))}
      </div>
    </main>
  );
}
