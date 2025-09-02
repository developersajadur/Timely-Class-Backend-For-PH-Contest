import { z } from 'zod';

// Create Service Record Validation
export const createServiceRecordValidation = z.object({
  body: z.object({
    bikeId: z.string().uuid('Invalid bikeId format'),
    serviceDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid serviceDate format',
      })
      .transform((val) => new Date(val)),
    description: z.string().min(1, 'Description cannot be empty'),
    status: z.enum(['pending', 'in_progress', 'completed'], {
      errorMap: () => ({
        message:
          "Invalid status value. Allowed values are 'pending', 'in_progress', or 'completed'",
      }),
    }),
  }),
});

// Update Service Record Validation
export const updateServiceRecordValidation = z.object({
  body: z.object({
    bikeId: z.string().uuid('Invalid bikeId format').optional(),
    serviceDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid serviceDate format',
      })
      .transform((val) => new Date(val))
      .optional(),
    description: z.string().min(1, 'Description cannot be empty').optional(),
    status: z
      .enum(['pending', 'in_progress', 'completed'], {
        errorMap: () => ({
          message:
            "Invalid status value. Allowed values are 'pending', 'in_progress', or 'completed'",
        }),
      })
      .optional(),
  }),
});

export const ServiceRecordSchema = {
  createServiceRecordValidation,
  updateServiceRecordValidation,
};
