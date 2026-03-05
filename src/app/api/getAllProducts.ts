import { Product } from "@/types/product.type";

export async function getAllProducts() : Promise<Product[]> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
  const finalRes = await res.json();

  // console.log(finalRes.data);

  return finalRes.data;
}
