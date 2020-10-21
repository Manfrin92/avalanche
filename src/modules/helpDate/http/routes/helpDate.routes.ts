import { Router } from 'express';
import HelpDateController from '../../controllers/HelpDateController';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';

const helpRouter = Router();
const helpController = new HelpDateController();

helpRouter.post('/add', ensureAuthenticated, helpController.create);
helpRouter.post(
  '/helpDatesByUserVolunteerId',
  ensureAuthenticated,
  helpController.helpDatesByUserVolunteerId,
);
helpRouter.post('/id', ensureAuthenticated, helpController.helpDatesById);
helpRouter.post(
  '/helpId',
  ensureAuthenticated,
  helpController.helpDatesByHelpId,
);
helpRouter.put('/', ensureAuthenticated, helpController.update);
helpRouter.delete('/', ensureAuthenticated, helpController.delete);

export default helpRouter;
