"use server";

import { getMyToken } from "@/app/api/getMyToken";
import axios from "axios";

export type shippingAddressType = {
  shippingAddress: {
    phone: string;
    details: string;
    city: string;
  };
};

export async function createCashOrder(
  cartId: string,
  shippingAddress: shippingAddressType,
) {
  try {
    const token = await getMyToken();

    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { shippingAddress },
      {
        headers: {
          token: token as string,
        },
      },
    );

    return data;
  } catch (error: any) {
    console.error("Cash Order Error:", error.response?.data || error.message);

    return {
      status: "error",
      message: error.response?.data?.message || "Something went wrong",
    };
  }
}

export async function createVisaOrder(
  cartId: string,
  shippingAddress: shippingAddressType,
) {
  try {
    const token = await getMyToken();

    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      shippingAddress,
      {
        headers: {
          token: token as string,
        },
      },
    );

    return data;
  } catch (error: any) {
    console.error("Visa Order Error:", error.response?.data || error.message);

    return {
      status: "error",
      message: error.response?.data?.message || "Something went wrong",
    };
  }
}
