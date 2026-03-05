import { getProductDetails } from "@/app/api/getProductDetails";
import React from "react";
import testImage from "../../../../public/testImage.jpeg";
import Image from "next/image";
import { clsx } from "clsx";
import Link from "next/link";
import AddToCartBtn from "@/app/_components/button/AddToCartBtn";
import AddToWishListBtn2 from "./addToWishListBtn2";

export default async function Details({ params }: any) {
  let { productDetails } = await params;

  const data = await getProductDetails(productDetails);
  console.log(data);

  return (
    <>
      <div className="w-[90%] mx-auto font-outfit py-25 md:py-20">
        <div className="md:flex">
          <div className="">
            <Image
              width={200}
              height={100}
              className="w-full md:w-full h-[600]"
              src={data.imageCover}
              alt="shawl"
            ></Image>
          </div>
          <div className="mt-15 md:w-3/4">
            <h4 className="mb-2 text-[var(--brand-primary-dark)] text-3xl font-bold cursor-pointer">
              {data.title.slice(0, 15)}
            </h4>
            <h4 className="mb-1 text-[var(--brand-primary)] text-[14px] font-semibold">
              {data.category.name}
            </h4>
            <h4 className="mb-2 text-gray-400 text-[14px]">
              {data.brand.name} |
              <span className="text-[var(--brand-primary)]">
                {data.quantity < 0 ? "Not Available" : " Available"}
              </span>
            </h4>
            <h4 className="me-5">
              <i className="fa-solid fa-star text-[#ffc908] me-1"></i>
              <span className="text-[var(--brand-primary-dark)]">{data.ratingsAverage}</span>
            </h4>
            <p className="text-gray-500 py-4">{data.description}</p>
            <h4 className="text-[var(--brand-primary)] font-semibold text-[18px]">
              EGP {data.price}
            </h4>
            <div className="py-5 flex">
              <AddToWishListBtn2 productId={ data._id} />
              <AddToCartBtn productId={data._id} rounded="md" />
            </div>
          </div>
          <Link href="/products">
            <button className="bg-[var(--brand-primary)] absolute end-5 -bottom-30 md:top-20 md:bottom-122 px-3 py-2 cursor-pointer rounded-full me-3 text-white mt-17 hover:scale-105 hover:-translate-x-1 duration-300">
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
