import { qstash } from '../app/shared/qstash';

export const scheduleReminder = async (
  scheduleId: string,
  userEmail: string,
  startTime: Date,
  reminderMinutes: number,
): Promise<string | null> => {
  try {
    // console.log("scheduleReminder called", { scheduleId, userEmail, startTime, reminderMinutes });

    // 1. Calculate trigger time
    const triggerTime = new Date(
      startTime.getTime() - reminderMinutes * 60 * 1000,
    );
    const now = new Date();
    const delayMs = triggerTime.getTime() - now.getTime();

    if (delayMs <= 0) {
      console.log('Trigger time already passed. Skipping QStash job.');
      return null;
    }

    const delaySeconds = Math.floor(delayMs / 1000);

    // 2. Schedule QStash job
    const job = await qstash.publish({
      url: `${process.env.BASE_URL}/send-reminder`, // your endpoint
      body: JSON.stringify({ scheduleId, userEmail }),
      delay: delaySeconds,
    });

    console.log('QStash job scheduled:', job);

    return job.messageId || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
