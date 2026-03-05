import { RegisterType } from "@/types/register.type";

export const registerFormInput: { name: keyof RegisterType; placeholder: string }[] = [
  { name: "name", placeholder: "Your Name" },
  { name: "email", placeholder: "Your Email" },
  { name: "password", placeholder: "Password" },
  { name: "rePassword", placeholder: "Confirm Password" },
  { name: "phone", placeholder: "Phone Number" },
];