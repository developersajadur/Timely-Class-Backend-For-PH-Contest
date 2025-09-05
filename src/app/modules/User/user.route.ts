import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.post(
  '/create',
  validateRequest(UserValidation.createUserSchema),
  UserController.createUserIntoDb,
);

router.patch(
  '/update',
  auth(Role.user),
  validateRequest(UserValidation.updateUserSchema),
  UserController.updateUserInDb,
);

export const UserRoutes = router;
