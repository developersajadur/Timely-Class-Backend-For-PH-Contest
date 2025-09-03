import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ScheduleRoutes } from '../modules/Schedule/schedule.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/schedules',
    route: ScheduleRoutes,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
