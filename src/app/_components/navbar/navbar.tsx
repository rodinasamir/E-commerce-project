"use client";
import { cartContext } from "@/app/_context/CartContext";
import { getWishlist } from "@/app/api/getWishList";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

interface WishListResponse {
  count: number;
}

export default function Navbar() {
  const { numOfCartItems } = useContext(cartContext);
  const [numOfWishList, setNumOfWishList] = useState<WishListResponse>({
    count: 0,
  });
  let session = useSession();
  function handleLogout() {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  }

  useEffect(() => {
    async function getWishList() {
      const data = await getWishlist();
      console.log(`numbOfwishlist`, data);
      setNumOfWishList(data);
    }
    getWishList();
    function handleUpdate() {
      getWishList();
    }
    window.addEventListener("wishlistUpdated", handleUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleUpdate);
    };
  }, []);

  return (
    <>
      <nav className=" bg-[#F0F3F2] font-outfit fixed mx-auto  z-20 top-0 start-0 end-0">
        <div className="max-w-7xl flex flex-wrap md:flex-nowrap justify-between items-center  mx-auto p-4 w-[90%]">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse text-[var(--brand-primary)] text-2xl"
          >
            <i className="fa-brands fa-opencart text-primary mr-2"></i>
            <span className="font-bold text-2xl font-semiblod text-[var(--brand-primary-dark)] self-center whitespace-nowrap">
              FreshCart
            </span>
          </Link>

          <div className="flex items-center text-[var(--brand-primary-dark)]">
            <div className="flex ms-4 items-center">
              <div className="relative">
                <span className="text-sm font-semibold bg-[var(--brand-primary)] text-white rounded-full px-2  absolute -top-3 z-40 -start-2">
                  {numOfWishList.count}
                </span>
                <Link href="/wishlist">
                  <i className="fa-solid fa-heart pe-8 text-lg hover:text-[var(--brand-primary)] hover:animate-shake"></i>
                </Link>
              </div>
              <div className="relative">
                <span className="text-sm font-semibold bg-[var(--brand-primary)] text-white rounded-full px-2  absolute -top-4 -start-2">
                  {numOfCartItems}
                </span>
                <Link href="/carts" className="flex items-center">
                  <i className="fa-solid fa-cart-shopping pe-8 text-lg hover:text-slate-700 duration-300"></i>
                </Link>
              </div>
            </div>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center text-[var(--brand-primary-dark)]  lg:hidden cursor-pointer"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
          </div>

          <div
            className="hidden w-full md:hidden lg:block md:w-[86%]"
            id="navbar-default"
          >
            <div className="md:flex justify-between">
              <div>
                <ul className="font-normal text-center  flex flex-col p-4 md:p-0 mt-4  border-default rounded-base bg-[#F0F3F2] md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:ms-7 md:border-0 md:bg-[#F0F3F2]">
                  <li>
                    <Link
                      href="/"
                      className="block py-2 px-3 text-gray-500  rounded md:bg-transparent md:text-[var(--brand-primary)] md:font-black md:p-0"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="block py-2 px-3 text-gray-500 rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-[var(--brand-primary)] transition: duration-400 md:p-0 md:dark:hover:bg-transparent"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories"
                      className="block py-2 px-3 text-gray-500 rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-[var(--brand-primary)] transition: duration-400 md:p-0 md:dark:hover:bg-transparent"
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/brands"
                      className="block py-2 px-3 text-gray-500 rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-[var(--brand-primary)] transition: duration-400 md:p-0 md:dark:hover:bg-transparent"
                    >
                      Brands
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/allorders"
                      className="block py-2 px-3 text-gray-500 rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-[var(--brand-primary)] transition: duration-400 md:p-0 md:dark:hover:bg-transparent"
                    >
                      Orders
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="text-center md:flex">
                <div>
                  <Link href="https://www.facebook.com/">
                    <i className="me-2 fa-brands fa-facebook text-[#0866ff] hover:-translate-y-1 duration-300"></i>
                  </Link>
                  <Link href="https://www.instagram.com/">
                    <i className="me-2 fa-brands fa-instagram text-[#ff115b] hover:-translate-y-1 duration-300"></i>
                  </Link>
                  <Link href="https://x.com">
                    <i className="me-2 fa-brands fa-x-twitter text-[var(--brand-primary-dark)] hover:-translate-y-1 duration-300"></i>
                  </Link>
                  <Link href="https://www.linkedin.com">
                    <i className="me-1 fa-brands fa-linkedin text-[#0a66c2] hover:-translate-y-1 duration-300"></i>
                  </Link>
                </div>

                <ul className="font-normal flex justify-center md:flex-row md:p-0 mt-4 border-default rounded-base bg-[#F0F3F2] md:space-x-3 rtl:space-x-reverse md:mt-0 md:ms-5 md:border-0 md:bg-[#F0F3F2]">
                  {session.data ? (
                    <li>
                      <Link
                        href="/login"
                        onClick={handleLogout}
                        className="block py-2 px-3 text-gray-500 rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0  transition: duration-400 md:p-0 md:dark:hover:bg-transparent"
                      >
                        Sign out
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/login"
                          className="block py-2 px-3 text-gray-500 rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 transition: duration-400 md:p-0 md:dark:hover:bg-transparent"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/register"
                          className="block py-2 px-3 text-gray-500 rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 transition: duration-400 md:p-0 md:dark:hover:bg-transparent"
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
