import { Router } from 'express';
import HelpController from '../../controllers/HelpController';

const helpRouter = Router();
const helpController = new HelpController();

helpRouter.post('/add', helpController.create);

export default helpRouter;
