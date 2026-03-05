"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { getAllCategories } from "@/app/api/getALLCategories";
import { useEffect, useState } from "react";
import { Category } from "./../../../types/product.type";
import { Navigation } from "swiper/modules";

export default function MainSlider() {
  const [cat, setcat] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllCategories();
      setcat(data);
    }
    fetchCategories();
  }, []);

  return (
    <div className="container w-[97%] md:w-[90%] mx-auto ">
      <Swiper
        navigation={true}
        spaceBetween={0}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 7,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        className="cursor-pointer w-[full] text-center"
        modules={[Navigation]}
        // autoplay={{ delay: 2000 }}
      >
        {cat.map((currentCat, index) => {
          return (
            <div>
              <SwiperSlide key={index} className="overflow-hidden">
                <div className="w-full h-87.5 md:h-75 relative">
                  <Image
                    loading="eager"
                    src={currentCat.image}
                    alt={currentCat.name}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
                <h2 className="py-2 bg-gray-200 text-[var(--brand-primary-dark)] font-semibold text-center">
                  {currentCat.name}
                </h2>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </div>
  );
}
