"use client";
import React, { useEffect, useState } from "react";
import { getAllCategories } from "../api/getALLCategories";
import { Category } from "@/types/product.type";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Categories() {
  const [cat, setcat] = useState<Category[]>([]);
  const [specCat, setspecCat] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllCategories();
      setcat(data);
      console.log(`data`, data);
    }
    fetchCategories();
  }, []);

  return (
    <>
      <div className="mt-20 mb-10 md:mt-20 w-[97%] md:w-[90%] mx-auto">
        <h1 className="text-[var(--brand-primary)] text-[18px] text-center border-y py-3 border-gray-200">
          Shop by category
        </h1>
        <div className="flex flex-wrap mt-10 gap-1">
          {cat.map((currentCat, index) => {
            return (
              <Link href="/categories/">
                <div>
                  <Card className="relative mx-auto border-0 p-2 m-0  pt-0 me-5 gap-2">
                    <div className="" />
                    <Image
                      width={150}
                      height={100}
                      src={currentCat.image}
                      alt="Event cover"
                      className="rounded-md h-[150] hover:scale-105 duration-300"
                    />
                  </Card>
                  <h4 className="text-center mb-6 mt-3 font-semibold text-[var(--brand-primary-dark)]">
                    {currentCat.name}
                  </h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
