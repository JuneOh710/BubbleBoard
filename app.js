import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import indexRouter from './routes/index.routes.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __dirname = path.resolve(path.dirname(decodeURI(new URL(import.meta.url).pathname)));
dotenv.config();

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('hi');


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {

    io.emit('chat message', msg);
  });
});

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`listening to port ${port}`);
})
