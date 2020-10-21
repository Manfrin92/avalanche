import { Router } from 'express';
import AddressController from '../../controllers/AddressController';

import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.post('/add', addressController.create);
addressRouter.post(
  '/getAddressById',
  ensureAuthenticated,
  addressController.getAddressById,
);
addressRouter.post('/', ensureAuthenticated, addressController.deleteById);

export default addressRouter;
