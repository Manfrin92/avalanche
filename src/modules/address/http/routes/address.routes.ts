import { Router } from 'express';
import AddressController from '../../controllers/AddressController';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.post('/add', addressController.create);
addressRouter.post('/getAddressById', addressController.getAddressById);
addressRouter.post('/', addressController.deleteById);

export default addressRouter;
