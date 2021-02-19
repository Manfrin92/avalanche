import { Router } from 'express';
import AddressController from '../../controllers/AddressController';

import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.post('/', addressController.create);
addressRouter.get(
  '/:id',
  ensureAuthenticated,
  addressController.getAddressById,
);
addressRouter.delete('/:id', ensureAuthenticated, addressController.deleteById);

export default addressRouter;
