import React from "react";
import { getAllProducts } from "../api/getAllProducts";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.type";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import AddToWishListBtn from "./addToWishListBtn";
import { Button } from "@/components/ui/button";
import AddToCartBtn2 from "./AdToCartBtn2";

export default async function Products() {
  const data = await getAllProducts();

  return (
    <>
      <div className="mt-20 mb-10 md:mt-30 font-outfit flex flex-wrap gap-6 box-border w-[90%]  mx-auto">
        {data.map((currentProduct: Product) => {
          return (
            <div
              key={currentProduct.id}
              className="w-1/1 relative group sm:w-[48%] md:w-[23%]"
            >
              <div className="relative group">
                <Link href={`/products/${currentProduct.id}`}>
                  <Card className="relative border-0 mx-auto w-full pt-0">
                    <Image
                      width={200}
                      height={100}
                      className="w-full h-[400]"
                      src={currentProduct.imageCover}
                      alt="shawl"
                    ></Image>
                    <CardHeader>
                      <CardDescription>
                        <div className="mb-2 text-[var(--brand-primary)] hover:text-[#f97316] duration-300 mt-5 text-[16px] cursor-pointer line-clamp-1">
                          <h4>{currentProduct.slug}</h4>
                        </div>
                        <div className="mb-2 text-[var(--brand-primary-dark)] font-semibold text-[16px]">
                          {currentProduct.category.name}
                        </div>
                        <h4 className="mb-2 text-gray-400 text-[14px] text-sm font-normal">
                          {currentProduct.brand.name} |
                          <span className="text-[var(--brand-primary)]">
                            {currentProduct.quantity <= 0
                              ? "Not Available"
                              : " Available"}
                          </span>
                        </h4>
                        <div className="flex justify-between">
                          <h4 className="text-[var(--brand-primary)]">
                            EGP {currentProduct.price}
                          </h4>
                          <h4 className="me-5 text-[var(--brand-primary-dark)]">
                            <i className="fa-solid fa-star text-[#ffc908] me-2"></i>
                            {currentProduct.ratingsAverage}
                          </h4>
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="flex gap-4">
                    <AddToWishListBtn productId={currentProduct._id} />
                    <AddToCartBtn2 productId={currentProduct._id} />
                    <Link href={`/products/${currentProduct.id}`}>
                      <Button className="flex gap-4 pointer-events-auto">
                        <span className="bg-[var(--brand-primary-soft)] hover:bg-[var(--brand-primary-dark)] cursor-pointer duration-300 rounded-full p-3">
                          <i className="text-white text-[17px] fa-solid fa-eye"></i>
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
