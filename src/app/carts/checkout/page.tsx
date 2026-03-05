"use client";
import { useContext } from "react";
import cashpay from "../../../../public/cachpay.png";
import visapay from "../../../../public/visapay.png";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import {
  createCashOrder,
  createVisaOrder,
  shippingAddressType,
} from "./payment.actions";
import { cartContext } from "@/app/_context/CartContext";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkOut } from "@/schemas/checkOut";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function page() {
  const route = useRouter();
  type CheckoutForm = {
    details: string;
    phone: string;
    city: string;
    type: "cash" | "online";
  };

  const form = useForm<CheckoutForm>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      type: "cash",
    },
    resolver: zodResolver(checkOut),
  });

  const { cartId, setCartData, setNumOfCartItems, cartData } =
    useContext(cartContext);

  console.log(`cartData`, cartData);
  async function handlePayment(value: CheckoutForm) {
    console.log(value);
    const userData: shippingAddressType = {
      shippingAddress: {
        city: value.city,
        phone: value.phone,
        details: value.details,
      },
    };
    if (value.type == "cash") {
      if (!cartId) {
        toast.error("Cart ID not found");
        return;
      }
      const res = await createCashOrder(cartId.toString(), userData);
      localStorage.setItem("lastOrder", JSON.stringify(res));
      console.log(`ressss`, res);
      if (res.status == "success") {
        setNumOfCartItems(0);
        setCartData(null);
        toast.success("order created", { position: "top-center" });
        route.push("/allorders");
      } else {
        toast.error("errrorrr...");
      }
    } else {
      if (!cartId) {
        toast.error("Cart ID not found");
        return;
      }
      const res = await createVisaOrder(cartId.toString(), userData);
      console.log(res);
      window.open(res.session.url);
    }
  }
  return (
    <>
      <div className="bg-[#F0F3F2] mx-5 rounded-lg">
        <div className="w-[90%] pt-20 pb-10 mt-25 mb-10  mx-auto">
          <h2
            className="relative text-[var(--brand-primary-dark)] text-lg font-bold text-center mb-15
before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2
before:-top-3 before:w-32 md:before:w-48 before:h-0.5 before:bg-[var(--brand-primary)]

after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
after:-bottom-3 after:w-32 md:after:w-48 after:h-0.5 after:bg-[var(--brand-primary)]
"
          >
            Check Out
          </h2>

          <div className="border border-gray-300 rounded-md p-5">
            <h3 className="text-lg font-bold text-[var(--brand-primary-dark)] mb-5">
              Cart totals
            </h3>
            <div className="ms-2">
              <h5 className="font-bold text-[var(--brand-primary-dark)]">
                SubTotal <span className="ms-1">:</span>{" "}
                <span className="ms-3 text-[var(--brand-primary)]">
                  EGP {cartData?.totalCartPrice ?? 0}
                </span>
              </h5>
              <div className="mt-7">
                <form
                  onSubmit={form.handleSubmit((data) =>
                    handlePayment({ ...data, type: "cash" }),
                  )}
                >
                  <Controller
                    name="city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Your City Name"
                          autoComplete="off"
                          className="border-gray-300  mb-5 text-sm placeholder:text-gray-400 bg-white"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Your Phone"
                          autoComplete="off"
                          className="border-gray-300 mb-5  text-sm placeholder:text-gray-400 bg-white"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="details"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <InputGroup className="mb-8  border-gray-300 bg-white">
                          <InputGroupTextarea
                            {...field}
                            id="form-rhf-demo-description"
                            placeholder="Details..."
                            rows={6}
                            className="min-h-24 resize-non text-sm placeholder:text-gray-400"
                            aria-invalid={fieldState.invalid}
                          />
                        </InputGroup>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <div className="ms-2">
                    <Button
                      onClick={form.handleSubmit((value) =>
                        handlePayment({ ...value, type: "cash" }),
                      )}
                      type="submit"
                      className=" text-white flex items-center justify-center w-full mb-5 bg-[var(--brand-primary)] box-border border border-transparent hover:bg-[var(--brand-primary-hover)] cursor-pointer  duration-300   font-medium  rounded-base text-md px-2 py-1.5 focus:outline-none"
                    >
                      <Image
                        width={40}
                        height={10}
                        src={cashpay}
                        className="me-2"
                        alt=""
                      ></Image>
                      <span> Cash Order</span>
                    </Button>
                    <Button
                      onClick={form.handleSubmit((value) =>
                        handlePayment({ ...value, type: "online" }),
                      )}
                      type="submit"
                      className="text-[var(--brand-primary-dark)] w-full flex items-center justify-center bg-white box-border border border-transparent hover:bg-[var(--brand-primary)] cursor-pointer hover:text-white duration-300 focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-md px-4 py-1.5"
                    >
                      <Image
                        width={40}
                        height={10}
                        src={visapay}
                        className="me-2"
                        alt=""
                      ></Image>
                      <span> Online Order</span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
