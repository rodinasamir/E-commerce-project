import React from "react";
import { getAllBrands } from "../api/getAllBrands";
import { Brand } from "@/types/product.type";
import Image from "next/image";

export default async function Brands() {
  const data = await getAllBrands();

  return (
    <div className="py-30 flex items-center flex-wrap gap-4 font-outfit justify-center w-full md:w-[90%] mx-auto">
      {data.map((currentBrand: Brand) => (
        <div key={currentBrand._id} className="flex justify-center w-1/4 md:w-[15%]">
          <span className="rounded-full py-12 px-10 shadow-md mb-5 hover:scale-105 hover:-translate-y-1.5 duration-300">
            <Image
              src={currentBrand.image}
              alt=""
              width={400}
              height={300}
              className=""
            ></Image>
          </span>
        </div>
      ))}
    </div>
  );
}
