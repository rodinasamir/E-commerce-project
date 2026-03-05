"use server";
import axios from "axios";
import { getMyToken } from "../api/getMyToken";

export async function updateCount(productId: string, count: number) {
  const token = await getMyToken();

  const { data } = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      count,
    },
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}
