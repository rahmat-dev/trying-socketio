import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie }) => (
  <li className="text-2xl font-semibold text-gray-800 mt-4">
    <Link to={`/movie/${movie.id}`} className="underline">
      {movie.title}
    </Link>
  </li>
);

export default MovieItem;
