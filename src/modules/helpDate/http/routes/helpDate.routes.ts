import { Router } from 'express';
import HelpDateController from '../../controllers/HelpDateController';

const helpRouter = Router();
const helpController = new HelpDateController();

helpRouter.post('/add', helpController.create);
helpRouter.post(
  '/helpDatesByUserVolunteerId',
  helpController.helpDatesByUserVolunteerId,
);
helpRouter.put('/', helpController.update);
helpRouter.delete('/', helpController.delete);

export default helpRouter;
