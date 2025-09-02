import { Router } from 'express';
import { customerRoute } from '../modules/Customer/customer.route';
import { bikeRoute } from '../modules/Bike/bike.route';
import { serviceRecordRoute } from '../modules/ServiceRecord/serviceRecord.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: customerRoute,
  },
  {
    path: '/',
    route: bikeRoute,
  },
  {
    path: '/',
    route: serviceRecordRoute,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
