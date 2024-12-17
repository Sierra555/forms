import { z } from 'zod';
import { ValidateZipcode } from './ValidateZipcode';

export const UserSchema = z.object({
    name: z.string().trim().min(2, { 
        message: 'Name should have at least 2 chars.',
    }),
    email: z.string().trim().email({
        message: 'Provide a valid email.',
    }),
    password: z.string().trim().min(8, 
        {
            message: 'Provide at least 8 chars.',
        }
    ).refine(pw => /[0-9]/.test(pw), {
        message: 'Password should contain at least one number'
    }).refine(pw => /[A-Z]/.test(pw), {
        message: 'Password should contain at least one uppercase letter.'
    }),
    zipcode: z.string().trim().refine(ValidateZipcode, {message: 'Invalid zipcode'})
})

export type UserSchemaType = z.infer<typeof UserSchema>;