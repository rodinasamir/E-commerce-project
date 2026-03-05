"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/registerlogin";
import { RegisterType } from "@/types/register.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { register } from "../api/register";
import { registerFormInput } from "./../../constants/register-inputs copy";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<RegisterType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterType) {
    setLoading(true);
    const res = await register(data);
    if (res === true) {
      router.push("/login");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="pt-25 pb-10">
        <h3 className="text-[var(--brand-primary)] font-bold text-3xl text-center mb-8">
          <i className="fa-regular fa-user me-2"></i>Register Now
        </h3>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[90%] mx-auto"
        >
          <FieldGroup>
            {registerFormInput.map((input) => {
              return (
                <>
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
                </>
              );
            })}
            <Button
              disabled={loading}
              className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] cursor-pointer py-5 text-white disabled:opacity-50"
            >
              Sign Up
            </Button>
            <Link href="/login">
              <h5 className="text-[var(--brand-primary)] text-center text-sm hover:underline duration-150">
                Already have an account?
              </h5>
            </Link>
          </FieldGroup>
        </form>
      </div>
    </>
  );
}
