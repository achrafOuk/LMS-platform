import z from "zod";

export const RegisterValidator = z
.object({
    email: z.string("email is required").email("Invalid email address"),
    password: z.string("password is required").min(8, "Password must be at least 8 characters"),
})
.strict();

export const LoginValidator = RegisterValidator;

export type LoginValidatorType = z.infer<typeof LoginValidator>;

export type RegisterValidatorType = z.infer<typeof RegisterValidator>;