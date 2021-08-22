import React from 'react';

import dummyMovies from './dummyMovies.json';
import MovieItem from './MovieItem';

const Home = () => (
  <div className="container p-8 mx-auto pt-20">
    <h1 className="text-3xl font-bold text-blue-500">List Movies</h1>
    <ul>
      {dummyMovies.map((movie) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </ul>
  </div>
);

export default Home;
