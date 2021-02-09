import { Router } from 'express';

import TypeController from '@modules/type/controllers/TypeController';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';

const typeRouter = Router();
const typeController = new TypeController();

typeRouter.get(
  '/:groupName',
  ensureAuthenticated,
  typeController.findAllByGroupName,
);

export default typeRouter;
