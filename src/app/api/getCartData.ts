"use server";

import axios from "axios";
import { getMyToken } from "./getMyToken";

type UserCartResponse = {
  cartId: string | number | null;
  data: unknown;
  numOfCartItems: number;
};

const EMPTY_CART: UserCartResponse = {
  cartId: null,
  data: null,
  numOfCartItems: 0,
};

export async function getUserCart(): Promise<UserCartResponse> {
  const token = await getMyToken();

  if (!token) {
    return EMPTY_CART;
  }

  try {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token,
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return EMPTY_CART;
    }

    throw error;
  }
}
