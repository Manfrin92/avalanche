import { Router } from 'express';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';
import NeedyController from '../../controllers/NeedyController';

const needyRouter = Router();
const needyController = new NeedyController();

needyRouter.get('/:needyId', ensureAuthenticated, needyController.getNeedyById);
needyRouter.get('/', ensureAuthenticated, needyController.getAllNeedies);
needyRouter.get(
  '/getNeedyByEmail/:needyEmail',
  ensureAuthenticated,
  needyController.getNeedyByEmail,
);
needyRouter.get(
  '/getNeedyByName/:needyName',
  ensureAuthenticated,
  needyController.getNeedyByName,
);

needyRouter.post(
  '/getNeedyByEmailOrName',
  ensureAuthenticated,
  needyController.getNeedyByEmailOrName,
);

export default needyRouter;
