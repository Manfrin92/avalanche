import { Router } from 'express';
import HelpController from '../../controllers/HelpController';

const helpRouter = Router();
const helpController = new HelpController();

helpRouter.post('/add', helpController.create);
helpRouter.put('/', helpController.update);
helpRouter.delete('/', helpController.delete);
helpRouter.get('/findHelps', helpController.findAllByUserManagerId);

export default helpRouter;
