import { loginType } from "@/types/login.type";

export const loginFormInput: {
  name: keyof loginType;
  placeholder: string;
}[] = [
  { name: "email", placeholder: "Your Email" },
  { name: "password", placeholder: "Password" },
];
