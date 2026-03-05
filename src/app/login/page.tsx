"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginFormInput } from "@/constants/login-inputs";
import { loginSchema } from "@/schemas/registerlogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { loginType } from "@/types/login.type";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<loginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: loginType) {
    setLoading(true);

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Welcome back", { position: "top-center" });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      toast.error("Invalid email or password", {
        position: "top-center",
      });
    }

    setLoading(false);
  }

  return (
    <>
      <div className="pt-30 pb-20">
        <h3 className="text-[var(--brand-primary)] font-bold text-3xl text-center mb-5">
          <i className="fa-regular fa-user me-2"></i>Login
        </h3>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[90%] mx-auto"
        >
          <FieldGroup>
            {loginFormInput.map((input, index) => {
              return (
                <div key={index}>
                  <Controller
                    name={input.name}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder={input.placeholder}
                          autoComplete="off"
                          className="border-gray-300 placeholder:text-gray-400"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              );
            })}
            <Button
              disabled={loading}
              className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] cursor-pointer py-6 text-white disabled:opacity-50"
            >
              Log In
            </Button>
            <h5 className="text-[var(--brand-primary)] text-center text-sm hover:underline duration-150">
              Forgot your password?
            </h5>
            <div className="text-center">
              <Link href="/register">
                <Button
                  disabled={loading}
                  className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] w-40 cursor-pointer py-5 text-white disabled:opacity-50"
                >
                  Create New Account
                </Button>
              </Link>
            </div>
          </FieldGroup>
        </form>
      </div>
    </>
  );
}
