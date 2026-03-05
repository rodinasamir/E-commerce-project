import React from "react";
import amazon from "../../../../public/amazon-pay-C6yg0mFR.png";
import american from "../../../../public/American-Express-Color-BA04NtD8.png";
import mastercard from "../../../../public/mastercard-DpLisAk5.webp";
import paypal from "../../../../public/paypal-f_p-vrjl.png";
import appstore from "../../../../public/get-apple-store-9A-0RbJo.png";
import googleplay from "../../../../public/get-google-play-BORhnNzJ.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#F0F3F2] static end-0 start-0 bottom-0 font-outfit py-10">
        <div className="w-[90%] mx-auto">
          <h1 className="text-[var(--brand-primary-dark)] font-bold text-2xl">
            Get the FreshCart App
          </h1>
          <p className="text-gray-500">
            We will send you a link, open it on your phone to download the app
          </p>
          <div className="my-5 flex mb-10">
            <input
              type="email"
              id="email"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-sm focus:ring-gray-900 focus:border-gray-900 block placeholder:text-gray-400 w-80 md:w-full shadow-xs"
              placeholder="Email..."
              required
            />
            <button
              type="button"
              className="text-white md:w-50 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] shadow-xs font-medium leading-5 px-5 text-md rounded-sm  ms-2 cursor-pointer"
            >
              Share App Link
            </button>
          </div>
          <hr className="border-sm border-gray-200" />
          <div className="items-center justify-between py-5">
            <div className="flex items-center">
              <div className="w-40 md:w-full">
                <h4 className="text-[var(--brand-primary-dark)] me-5">Payment Partners</h4>
              </div>
              <Link href="">
                <Image src={amazon} alt="amazon" className="w-16 me-5" />
              </Link>
              <Link href="">
                <Image src={american} alt="american" className="w-16 me-5" />
              </Link>
              <Link href="">
                <Image src={mastercard} alt="american" className="w-16 me-5" />
              </Link>
              <Link href="">
                <Image src={paypal} alt="american" className="w-16" />
              </Link>
            </div>

            <div className="flex items-center">
              <div className="w-60 md:w-full">
                <h4 className="text-[var(--brand-primary-dark)] me-5 ">
                  Get deliveries with FreshCart
                </h4>
              </div>
              <Link href="">
                <Image src={appstore} alt="amazon" className="w-24 me-5" />
              </Link>
              <Link href="">
                <Image src={googleplay} alt="american" className="w-24 me-5" />
              </Link>
            </div>
          </div>
          <hr className="border-sm border-gray-200" />
        </div>
      </footer>
    </>
  );
}
