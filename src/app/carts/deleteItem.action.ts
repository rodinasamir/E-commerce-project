"use server";
import axios from "axios";
import { getMyToken } from "../api/getMyToken";

export async function deleteItem(productId: string) {
  const token = await getMyToken();

  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}

export async function clearCart() {
  const token = await getMyToken();

  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}
