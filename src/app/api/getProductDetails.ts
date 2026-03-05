import { cache } from "react";
import { ResolvingViewport } from "next/types.js";

export async function getProductDetails(productDetails: any) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productDetails}`,
    { method: "GET", next: { revalidate: 30 } },
  );
  const finalRes = await res.json();

  // console.log(finalRes.data);

  return finalRes.data;
}
