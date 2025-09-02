import { Router } from 'express';
import { serviceRecordController } from './serviceRecord.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceRecordSchema } from './serviceRecord.validation';

const router = Router();

router.post(
  '/services',
  validateRequest(ServiceRecordSchema.createServiceRecordValidation),
  serviceRecordController.createServiceRecordIntoDb,
);
router.get('/services', serviceRecordController.getAllServiceRecordsFromDb);
router.get(
  '/services/status',
  serviceRecordController.getStatusBaseServiceRecordFromDb,
);
router.get(
  '/services/:id',
  serviceRecordController.getSingleServiceRecordFromDb,
);
router.put(
  '/services/:id',
  validateRequest(ServiceRecordSchema.updateServiceRecordValidation),
  serviceRecordController.updateServiceRecordIntoDb,
);

export const serviceRecordRoute = router;
