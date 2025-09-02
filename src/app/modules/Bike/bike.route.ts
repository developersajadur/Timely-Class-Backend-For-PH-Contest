import { Router } from 'express';
import { bikeController } from './bike.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidationSchema } from './bike.validation';

const router = Router();

router.post(
  '/bikes',
  validateRequest(BikeValidationSchema.createBikeValidation),
  bikeController.createBikeIntoDb,
);
router.get('/bikes', bikeController.getAllBikesFromDbWithQuery);
router.get('/bikes/:id', bikeController.getSingleBikeFromDb);
router.put(
  '/bikes/:id',
  validateRequest(BikeValidationSchema.updateBikeValidation),
  bikeController.updateBikeIntoDb,
);
router.delete('/bikes/:id', bikeController.softDeleteBikeFromDb);

export const bikeRoute = router;
