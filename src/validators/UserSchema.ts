import { z } from "zod";

const UserSchema = z.object({
    username: z.string().min(4).trim(),
    password: z.string().min(4).trim(),
    email: z.string().email().trim(),
    phone: z
        .string()
        .trim()
        .refine(
            (value): Boolean => {
                const mobilePattern = /^09[1-689][0-9]{7}$/;
                return mobilePattern.test(value);
            },
            {
                message: "Phone number must be syrian: 09[1-689][0-9]",
            }
        ),
});

export default UserSchema;
