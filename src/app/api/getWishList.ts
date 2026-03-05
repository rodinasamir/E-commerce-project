"use server";

import axios from "axios";
import { getMyToken } from "./getMyToken";

type WishlistResponse = {
  count: number;
  data: unknown[];
};

const EMPTY_WISHLIST: WishlistResponse = {
  count: 0,
  data: [],
};

export async function getWishlist(): Promise<WishlistResponse> {
  const token = await getMyToken();

  if (!token) {
    return EMPTY_WISHLIST;
  }

  try {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token,
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return EMPTY_WISHLIST;
    }

    throw error;
  }
}
