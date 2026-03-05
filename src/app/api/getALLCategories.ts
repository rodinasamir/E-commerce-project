import { Category } from "@/types/product.type";

export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
  const finalRes = await res.json();

  return finalRes.data;
}
