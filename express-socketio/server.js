const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    allow: 'http://localhost:3000',
  },
});
const cors = require('cors');
const port = 5000;

let comments = [];

function getCommentsByMovieId(movieId) {
  return comments.filter((comment) => comment.movieId == movieId);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello socketio'));
app.get('/movies/:movieId/comments', (req, res) => {
  const { movieId } = req.params;
  const commentsByMovieId = getCommentsByMovieId(movieId);
  res.json({
    status: 200,
    message: 'success',
    data: {
      comments: commentsByMovieId,
    },
  });
});

io.on('connection', (socket) => {
  socket.on('movie:addComment', (comment) => {
    comments.push({
      ...comment,
      id: new Date().getTime(),
    });
    const commentsByMovieId = getCommentsByMovieId(comment.movieId);
    const response = {
      status: 200,
      message: 'success',
      data: {
        comments: commentsByMovieId,
      },
    };
    io.emit(`movie:${comment.movieId}:getComment`, response);
  });
});

httpServer.listen(port, () =>
  console.log(`server running at http://localhost:${port}`)
);
