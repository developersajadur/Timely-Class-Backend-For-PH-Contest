import { reminderEmailTemplate } from '../../templates/reminderEmailTemplate';
import prisma from '../shared/prisma';
import { sendEmail } from '../utils/email';

export const scheduleReminderJob = async () => {
  const now = new Date();
  const todayStr = now.toDateString();
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });

  const schedules = await prisma.schedule.findMany({
    where: {
      reminderMinutes: { not: null },
      isDeleted: false,
      OR: [{ date: null, day: weekday }, { date: { not: null } }],
    },
    include: {
      user: {
        select: { email: true, name: true },
      },
    },
  });

  for (const schedule of schedules) {
    let scheduleDateTime: Date;

    if (schedule.date) {
      scheduleDateTime = new Date(
        `${schedule.date.toDateString()} ${schedule.startTime}`,
      );
    } else {
      scheduleDateTime = new Date(`${todayStr} ${schedule.startTime}`);
    }

    const triggerTime = new Date(
      scheduleDateTime.getTime() - schedule.reminderMinutes! * 60 * 1000,
    );

    // Skip if reminder already sent today for recurring schedule
    if (
      !schedule.date &&
      schedule.lastReminderSent?.toDateString() === todayStr
    )
      continue;

    if (now >= triggerTime && now < scheduleDateTime) {
      const sendForEmail = {
        userName: schedule.user.name,
        subject: schedule.subject,
        instructor: schedule.instructor,
        startTime: schedule.startTime,
        day: schedule?.day,
      };
      await sendEmail({
        to: schedule.user.email,
        subject: `Reminder For: ${schedule.subject} Class`,
        html: reminderEmailTemplate(sendForEmail),
      });

      await prisma.schedule.update({
        where: { id: schedule.id },
        data: {
          reminderSent: !!schedule.date,
          lastReminderSent: now,
        },
      });

      console.log(
        `[${new Date().toISOString()}] Reminder sent for scheduleId: ${schedule.id}`,
      );
    }
  }
};
