import prisma from '../shared/prisma';
import { sendEmail } from '../utils/email';

export const scheduleReminderJob = async () => {
  // console.log(`[${new Date().toISOString()}] Running scheduleReminderJob...`);
  const now = new Date();
  const today = now.toLocaleDateString('en-US', { weekday: 'long' });

  const schedules = await prisma.schedule.findMany({
    where: {
      reminderMinutes: { not: null },
      isDeleted: false,
      reminderSent: false,
      OR: [{ date: null, day: today }, { date: { not: null } }],
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
      const currentDate = now.toDateString();
      scheduleDateTime = new Date(`${currentDate} ${schedule.startTime}`);
    }

    const triggerTime = new Date(
      scheduleDateTime.getTime() - schedule.reminderMinutes! * 60 * 1000,
    );

    if (now >= triggerTime && now < scheduleDateTime) {
      await sendEmail({
        to: schedule.user.email,
        subject: `Reminder For: ${schedule.subject} Class`,
        html: `
          <p>Hi, <strong>${schedule.user.name}</strong></p>
          <p>Your class <strong>${schedule.subject}</strong> with <strong>${schedule.instructor}</strong> starts at <strong>${schedule.startTime}</strong> on <strong>${schedule.day}</strong>.</p>
          <p>Don't be late!</p>
        `,
      });

      await prisma.schedule.update({
        where: { id: schedule.id, isDeleted: false, reminderSent: false },
        data: { reminderSent: true },
      });

      // console.log(`[${new Date().toISOString()}] Reminder sent for scheduleId: ${schedule.id}`);
    }
  }
};
