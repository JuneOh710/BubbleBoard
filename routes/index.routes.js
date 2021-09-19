import express from 'express';
const { Router } = express;
const router = Router();

/* GET index page. */
router.get('/', (req, res, next) => {

  res.render('index.views.ejs');
});

// make new board
router.get('/board/new', (req, res, next) => {
  console.log(req.query)
  const { name } = req.query;
  res.render('create-board.views.ejs', { name });
})

router.post('/board', (req, res, next) => {
  res.redirect('/board')
})

router.get('/board', (req, res, next) => {
  const { name, title, duration } = req.query;
  const url = `/board?title=${title}&duration=${duration}`;
  res.render('board.views.ejs', { title, duration, name, url });
})

export default router;
