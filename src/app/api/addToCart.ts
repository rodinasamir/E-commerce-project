"use server";
import axios from "axios";
import { getMyToken } from "./getMyToken";

export async function addItemToCart(productId: string) {
  const token = await getMyToken();
  const {data} = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      productId: productId,
    },
    {
      headers: {
        token: token as string,
      },
    },
  );
  return data;
}
