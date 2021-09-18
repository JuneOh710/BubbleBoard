import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.views.ejs', { title: 'bubl board' });
});

export default router;
