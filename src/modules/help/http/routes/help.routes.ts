import { Router } from 'express';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';
import HelpController from '../../controllers/HelpController';

const helpRouter = Router();
const helpController = new HelpController();

helpRouter.post('/', ensureAuthenticated, helpController.create);
helpRouter.put('/', ensureAuthenticated, helpController.update);
helpRouter.delete('/:id', ensureAuthenticated, helpController.delete);
helpRouter.get(
  '/:userManagerId',
  ensureAuthenticated,
  helpController.findAllByUserManagerId,
);
helpRouter.get('/:id', ensureAuthenticated, helpController.findAllById);
helpRouter.get(
  '/getHelpRelatedInfo/:helpId',
  ensureAuthenticated,
  helpController.getHelpRelatedInfo,
);

export default helpRouter;
