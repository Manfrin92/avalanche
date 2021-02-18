import { Router } from 'express';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';
import NeedyController from '../../controllers/NeedyController';

const needyRouter = Router();
const needyController = new NeedyController();

needyRouter.get(
  '/getNeedyById/:needyId',
  ensureAuthenticated,
  needyController.getNeedyById,
);
needyRouter.get(
  '/getAllNeedies',
  ensureAuthenticated,
  needyController.getAllNeedies,
);
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

export default needyRouter;
