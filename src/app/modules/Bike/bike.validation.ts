import { z } from 'zod';

const createBikeValidation = z.object({
  body: z.object({
    brand: z
      .string({
        required_error: 'Brand is required',
      })
      .min(1, 'Brand cannot be empty'),

    model: z
      .string({
        required_error: 'Model is required',
      })
      .min(1, 'Model cannot be empty'),

    year: z
      .number({
        required_error: 'Year is required',
      })
      .int('Year must be an integer')
      .min(1900, 'Year must be greater than or equal to 1900')
      .max(new Date().getFullYear(), `Year cannot be in the future`),

    customerId: z
      .string({
        required_error: 'Customer ID is required',
      })
      .uuid('Invalid Customer ID'),
  }),
});

const updateBikeValidation = z.object({
  body: z.object({
    brand: z.string().min(1, 'Brand cannot be empty').optional(),
    model: z.string().min(1, 'Model cannot be empty').optional(),
    year: z
      .number()
      .int('Year must be an integer')
      .min(1900, 'Year must be greater than or equal to 1900')
      .max(new Date().getFullYear(), `Year cannot be in the future`)
      .optional(),
    customerId: z.string().uuid('Invalid Customer ID').optional(),
  }),
});

export const BikeValidationSchema = {
  createBikeValidation,
  updateBikeValidation,
};
