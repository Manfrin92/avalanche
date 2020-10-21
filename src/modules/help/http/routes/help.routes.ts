import { Router } from 'express';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';
import HelpController from '../../controllers/HelpController';

const helpRouter = Router();
const helpController = new HelpController();

helpRouter.post('/add', ensureAuthenticated, helpController.create);
helpRouter.put('/', ensureAuthenticated, helpController.update);
helpRouter.delete('/', ensureAuthenticated, helpController.delete);
helpRouter.post(
  '/findHelps',
  ensureAuthenticated,
  helpController.findAllByUserManagerId,
);
helpRouter.post('/findHelp', ensureAuthenticated, helpController.findAllById);

export default helpRouter;
