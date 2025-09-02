import { Router } from 'express';
import { customerController } from './customer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerValidationSchema } from './customer.validation';

const router = Router();

router.post(
  '/customers',
  validateRequest(CustomerValidationSchema.createCustomerValidation),
  customerController.createCustomerIntoDb,
);
router.get('/customers', customerController.getAllCustomersFromDbWithQuery);
router.get('/customers/:id', customerController.getSingleCustomerFromDb);
router.put(
  '/customers/:id',
  validateRequest(CustomerValidationSchema.updateCustomerValidation),
  customerController.updateCustomerIntoDb,
);
router.delete('/customers/:id', customerController.softDeleteCustomerFromDb);

export const customerRoute = router;
