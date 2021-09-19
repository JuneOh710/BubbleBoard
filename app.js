import createError from 'http-errors';
import express from 'express';
const { json, urlencoded } = express;
import path from 'path';
const { join } = path;
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';


import indexRouter from './routes/index.routes.js';

// ml imports
// const spawn = require("child_process").spawn;
import spawn from 'child_process';
const pythonProcess = spawn.spawn('python', ["path/to/script.py"]);


const app = express();
const server = http.createServer(app);
const io = new Server(server);
dotenv.config();








// websockieeeeessss
// run when a client connects
import { formatQuestion } from './utils/questions.js';
import { users, addUser, getCurrentUser, removeCurrentUser } from './utils/users.js';

io.on('connection', socket => {
  socket.on('question', ({ text }) => {
    // send this message to every user
    console.log(text)
    io.emit('question', formatQuestion(text))
  })

  // handle user disconnecting
  socket.on('disconnect', () => {
    const user = getCurrentUser(socket.id)
    // send to everyone connected
    removeCurrentUser(user)
  })
})






import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))

app.use('/home', (req, res) => {
  res.render('home.views.ejs');
})
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
  res.render('error.ejs');
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`listening to port ${port}`);
})
