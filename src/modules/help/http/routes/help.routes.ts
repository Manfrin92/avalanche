import { Router } from 'express';
import HelpController from '../../controllers/HelpController';

const helpRouter = Router();
const helpController = new HelpController();

helpRouter.post('/add', helpController.create);
// helpRouter.post('/update', helpController.update);
// helpRouter.post('/remove', helpController.remove);
helpRouter.get('/findHelps', helpController.findAllByUserManagerId);

export default helpRouter;
