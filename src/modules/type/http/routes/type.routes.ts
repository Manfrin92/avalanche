import TypeController from '@modules/type/controllers/TypeController';
import { Router } from 'express';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';

const typeRouter = Router();
const typeController = new TypeController();

typeRouter.get('/:groupName', ensureAuthenticated, typeController.findAllByGroupName);

typeRouter.get('/', ensureAuthenticated, typeController.findAll);

export default typeRouter;
