import status from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { ReminderService } from './reminder.service';
import AppError from '../../helpers/AppError';
import { tokenDecoder } from '../../helpers/tokenDecoder';

const sendScheduleReminder = catchAsync(async (req, res) => {
  const { scheduleId, userEmail } = req.body;
  if (!scheduleId || !userEmail) {
    throw new AppError(status.NOT_ACCEPTABLE, 'Invalid payload');
  }

  const result = await ReminderService.sendScheduleReminder(
    scheduleId,
    userEmail,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Send Reminder successfully',
    data: result,
  });
});

const addOrUpdateReminder = catchAsync(async (req, res) => {
  const { scheduleId, reminderMinutes } = req.body;
  const decoded = tokenDecoder(req);

  if (!scheduleId || !reminderMinutes) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  const schedule = await ReminderService.addOrUpdateReminder(
    scheduleId,
    decoded.id,
    reminderMinutes,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Reminder set successfully',
    data: schedule,
  });
});

export const ReminderController = {
  sendScheduleReminder,
  addOrUpdateReminder,
};
