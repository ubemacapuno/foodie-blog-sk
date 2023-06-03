import { z } from 'zod';

export const REQUIRED_FIELD = 'This field is required';
export const requiredString = z.string().min(1, REQUIRED_FIELD);
export const optionalString = z.string().min(1).max(100).nullable().optional();
