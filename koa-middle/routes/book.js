import api from '../controllers/book.js';
import koaRouter from 'koa-router';
const router = koaRouter();

router.get('/book', api.getSubject);
router.get('/book/isvip', api.getVip);
router.get('/book/getGrade', api.getGrade);
router.get('/book/getSwitchLists', api.getSwitchLists);

export default router;