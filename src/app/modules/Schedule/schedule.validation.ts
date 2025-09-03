import { z } from 'zod';

const createScheduleSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    subject: z.string().min(1, 'Subject is required'),
    instructor: z.string().min(1, 'Instructor is required'),
    day: z.string().min(1, 'Day is required'), // e.g., Monday
    startTime: z
      .string()
      .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format, use HH:mm'),
    endTime: z
      .string()
      .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format, use HH:mm'),
    date: z.string().optional(),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color hex')
      .optional(),
    description: z.string().optional(),
  }),
});

const updateScheduleSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    subject: z.string().min(1, 'Subject is required').optional(),
    instructor: z.string().min(1, 'Instructor is required').optional(),
    day: z.string().min(1, 'Day is required').optional(), // e.g., Monday
    startTime: z
      .string()
      .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format, use HH:mm')
      .optional(),
    endTime: z
      .string()
      .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format, use HH:mm')
      .optional(),
    date: z.string().optional().optional(),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color hex')
      .optional()
      .optional(),
    description: z.string().optional(),
  }),
});

export const ScheduleValidation = {
  createScheduleSchema,
  updateScheduleSchema,
};
