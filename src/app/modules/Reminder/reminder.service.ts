import status from 'http-status';
import { sendEmail } from '../../../utils/email';
import AppError from '../../helpers/AppError';
import prisma from '../../shared/prisma';
import { scheduleReminder } from '../../../utils/scheduleReminder';

const sendScheduleReminder = async (scheduleId: string, userEmail: string) => {
  // Validate schedule
  const schedule = await prisma.schedule.findUnique({
    where: { id: scheduleId },
  });
  if (!schedule || schedule.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Schedule not found.');
  }

  // Send email
  await sendEmail({
    to: userEmail,
    subject: 'Class Reminder',
    html: `Reminder: Your class "${schedule.subject}" with ${schedule.instructor} starts at ${schedule.startTime} on ${schedule.day}.`,
  });

  return { success: true, message: 'Reminder sent' };
};

const addOrUpdateReminder = async (
  scheduleId: string,
  userId: string,
  reminderMinutes: number,
) => {
  // 1. Transaction to update the schedule
  const updatedSchedule = await prisma.$transaction(async (tx) => {
    const schedule = await tx.schedule.findFirst({
      where: { id: scheduleId, userId, isDeleted: false },
      include: { user: true }, // ensure we get the user for email
    });

    if (!schedule) {
      throw new Error('Schedule not found');
    }

    // 2. Update reminderMinutes
    const result = await tx.schedule.update({
      where: { id: scheduleId },
      data: { reminderMinutes },
      include: { user: true }, // include user again so result has user
    });

    return result;
  });

  // 3. Schedule QStash job **after transaction**
  if (reminderMinutes && updatedSchedule.date) {
    try {
      const startTime = new Date(updatedSchedule.date);
      const jobId = await scheduleReminder(
        scheduleId,
        updatedSchedule.user.email,
        startTime,
        reminderMinutes,
      );

      // 4. Save jobId in schedule
      await prisma.schedule.update({
        where: { id: scheduleId },
        data: { reminderJobId: jobId },
      });

      console.log('Scheduled QStash job ID:', jobId);
    } catch (err) {
      console.error('Failed to schedule QStash job:', err);
    }
  }

  return updatedSchedule;
};

export const ReminderService = {
  sendScheduleReminder,
  addOrUpdateReminder,
};
