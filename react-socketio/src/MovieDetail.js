import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import dummyMovies from './dummyMovies.json';
import CommentCard from './CommentCard';

const MovieDetail = () => {
  const movieId = parseInt(useParams().movieId);
  const history = useHistory();
  const movie = dummyMovies.filter(
    (dummyMovie) => dummyMovie.id === movieId
  )[0];
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('http://localhost:5000'));
    const getCommentsByMovieId = async () => {
      const fetchResp = await fetch(
        `http://localhost:5000/movies/${movieId}/comments`
      );
      const res = await fetchResp.json();
      setComments(res.data.comments);
    };

    getCommentsByMovieId();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(`movie:${movieId}:getComment`, (res) => {
        if (res.message === 'success') {
          setComments(res.data.comments);
        }
      });
    }
  }, [socket]);

  const goBack = () => history.goBack();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit(`movie:addComment`, {
        movieId,
        sender,
        message,
      });
      setSender('');
      setMessage('');
    }
  };

  return (
    <div className="container p-8 mx-auto py-20">
      <button onClick={goBack} className="text-blue-500">
        &larr; Go Back
      </button>
      <h1 className="text-3xl font-bold mt-8 mb-2">
        {movie.title} ({movie.release_date})
      </h1>
      {movie.genres.split('|').map((genre) => (
        <span
          className="bg-gray-800 text-white font-semibold rounded-full py-1 px-3 text-xs mr-2"
          key={genre}
        >
          {genre}
        </span>
      ))}
      <p className="mt-8">{movie.description}</p>

      <div className="mt-12">
        <h2 className="text-xl font-semibold">Comments</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border-2 border-gray-800 rounded-md w-full py-2 px-3 mt-4"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="Your Name"
          />
          <input
            type="text"
            className="border-2 border-gray-800 rounded-md w-full py-2 px-3 mt-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white font-semibold rounded-md py-2 px-6 mt-2"
          >
            Kirim
          </button>
        </form>

        {comments.length > 0 &&
          comments.map((comment) => (
            <CommentCard key={comment?.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default MovieDetail;
