import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ScheduleRoutes } from '../modules/Schedule/schedule.route';
import { ArchiveRoutes } from '../modules/Archive/archive.route';
import { ReminderRoutes } from '../modules/Reminder/reminder.route';
import { EmailOtpRoutes } from '../modules/EmailOtp/emailOtp.route';

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
  {
    path: '/archives',
    route: ArchiveRoutes,
  },
  {
    path: '/reminders',
    route: ReminderRoutes,
  },
  {
    path: '/emails-otp',
    route: EmailOtpRoutes,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
