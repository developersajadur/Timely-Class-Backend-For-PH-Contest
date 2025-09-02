import { z } from 'zod';

export const createCustomerValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, 'Name cannot be empty'),

    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email address'),

    phone: z
      .string({
        required_error: 'Phone number is required',
      })
      .min(7, 'Phone number must be at least 7 characters'),
  }),
});

export const updateCustomerValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name cannot be empty').optional(),
    email: z.string().email('Invalid email address').optional(),
    phone: z
      .string()
      .min(7, 'Phone number must be at least 7 characters')
      .optional(),
  }),
});

export const CustomerValidationSchema = {
  createCustomerValidation,
  updateCustomerValidation,
};
