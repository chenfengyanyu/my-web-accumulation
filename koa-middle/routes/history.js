import api from '../controllers/history.js';
import koaRouter from 'koa-router';
const router = koaRouter();

router.get('/history', api.list);
router.get('/history/total/', api.total);

export default router;