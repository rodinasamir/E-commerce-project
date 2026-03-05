import z, { object, string } from "zod";

export const registerSchema = z
  .object({
    name: string().nonempty("name is required").min(3),
    email: string().nonempty("email is required").email(),
    password: string().nonempty("password is required").min(6),
    rePassword: string().nonempty("rePassword is required").min(6),
    phone: string().nonempty("phone is required").min(6),
  }) ;

export const loginSchema = z.object({
  email: string().nonempty("email is required").email(),
  password: string().nonempty("password is required").min(6),
});
