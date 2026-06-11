import z from "zod";

export const RegisterValidator = z
.object({
    email: z.string().email(),
    password: z.string().min(8),
})
.strict();

export const LoginValidator = RegisterValidator;
