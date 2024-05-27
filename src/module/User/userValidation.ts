import z from "zod";

export const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
export const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({ required_error: "Email is required" }),
    newPassword: z.string({ required_error: "Password is required" }),
  }),
});

export const userUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    photo: z.string().optional(),
  }),
});
