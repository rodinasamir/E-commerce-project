"use server";
import axios from "axios";
import { getMyToken } from "./getMyToken";

export async function addToWishlist(productId: string) {
  const token = await getMyToken();
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      productId: productId,
    },
    {
      headers: {
        token: token as string,
      },
    },
  );
  console.log(data);

  return data;
}
