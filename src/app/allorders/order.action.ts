"use server";

import axios from "axios";
import { getMyToken } from "../api/getMyToken";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  exp: number;
  iat: number;
  name: string;
  role: string;
}

export async function getUserOrders() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("No token found");
  }
  const userData: DecodedToken = jwtDecode<DecodedToken>(token);
  console.log(`userdataaaa`, userData);

  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`,
  );

  return data;
}
