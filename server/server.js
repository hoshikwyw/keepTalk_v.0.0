import express, { json } from 'express';
import { createServer } from 'http';
import socketIo from 'socket.io';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import videoRoutes from './routes/videoRoutes';

const app = express();
const server = createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

connectDB();

app.use(cors());
app.use(json());

app.use('/api', authRoutes);
app.use('/api', videoRoutes);

app.get('/test', (req, res) => {
  res.send('Server is running');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('candidate', (candidate) => {
    socket.broadcast.emit('candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
