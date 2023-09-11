import express, {Router} from 'express';
import { index,show,create,update } from '../controllers/PollsController';
const router:Router = express.Router();

router.get('/',index);
router.get('/:id',show);
router.post('/create',create);
router.put('/:id',update);

export default router;