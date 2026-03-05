"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import blackfriday from "../../../../public/blackfriday.jpg";
import skinCareImage from "../../../../public/img3.jpg";
import cloth from "../../../../public/cloth.jpg";
import wardrobe from "../../../../public/wardrobe.jpg";
import man from "../../../../public/ma.jpg";

export default function MainSlider() {

  return (
    <div className="flex flex-col md:flex-row  mt-18 container w-[97%] md:w-[90%] mx-auto ">
      <div className="w-full md:w-[65%]">
        <Swiper
          pagination={{clickable : true}}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          className="cursor-pointer"
          modules={[Pagination]}
          // autoplay={{ delay: 2000 }}
        >
          <SwiperSlide className="relative w-3/4">
            <Image
              loading="eager"
              src={man}
              alt="image"
              className="h-[400] md:h-[700] object-cover"
            />
            <div className="absolute top-3 z-30 ms-7">
              <div className="bg-white w-54 text-3xl font-extrabold text-[var(--brand-primary-dark)] rounded-4xl py-1.5">
                <h1 className="text-center">
                  <i className="fa-brands fa-opencart text-[var(--brand-primary)] me-3"></i>
                  Fresh Cart
                </h1>
              </div>
              <p className="text-white text-sm mt-3 mb-4 font-semibold bg-[#5e5d5d4f] px-3 py-5 rounded-md">
                Whether you’re looking for the freshest produce, pantry staples,
                or specialty items, <br /> FreshCart brings the supermarket to
                you, redefining the way you shop for groceries.
              </p>
              <button className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] cursor-pointer text-white px-10 py-2 rounded-4xl">
                Get Started
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={wardrobe}
              alt="image"
              className="h-[400]  md:h-[700] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={cloth} alt="image" className="h-[400]  md:h-[700] object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-full md:w-[40%] flex  md:flex-col">
        <Image
          src={skinCareImage}
          alt="image"
          className="h-[250px] md:h-[350px] object-cover"
        />
        <Image
          src={blackfriday}
          alt="image"
          className="h-[250px] md:h-[350px] object-cover"
        />
      </div>
    </div>
  );
}
