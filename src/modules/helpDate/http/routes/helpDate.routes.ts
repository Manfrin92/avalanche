import { Router } from 'express';
import HelpDateController from '../../controllers/HelpDateController';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';

const helpRouter = Router();
const helpController = new HelpDateController();

helpRouter.post('/', ensureAuthenticated, helpController.create);
helpRouter.get(
  '/:userVolunteerId',
  ensureAuthenticated,
  helpController.helpDatesByUserVolunteerId,
);
helpRouter.get('/:id', ensureAuthenticated, helpController.helpDatesById);
helpRouter.get(
  '/helpDatesByHelpId/:helpId',
  ensureAuthenticated,
  helpController.helpDatesByHelpId,
);
helpRouter.put('/', ensureAuthenticated, helpController.update);
helpRouter.delete('/:id', ensureAuthenticated, helpController.delete);

export default helpRouter;
