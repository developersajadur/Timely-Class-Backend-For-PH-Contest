import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = Router();

router.post(
  '/create',
  validateRequest(UserValidation.createUserSchema),
  UserController.createUserIntoDb,
);

export const UserRoutes = router;
