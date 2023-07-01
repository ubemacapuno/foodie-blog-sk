import { z } from 'zod';

export const REQUIRED_FIELD = 'This field is required';

export const requiredString = z.string().min(1, REQUIRED_FIELD);

export const optionalString = z.string().optional().default('');

export const optionalEmail = z.string().email().optional().or(z.literal(''));

export const optionalUrl = z.string().url().optional().or(z.literal(''));
