import { Router } from 'express';
const router = Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index.views.ejs');
});

// make new board
router.get('/board/new', (req, res, next) => {
  res.render('create-board.views.ejs');
})

router.post('/board', (req, res, next) => {
  const { title, duration } = req.body;
  res.render('board.views.ejs', { title, duration });
})

export default router;
