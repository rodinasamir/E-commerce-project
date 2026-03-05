"use client";
import Link from "next/link";
import { getWishlist } from "../api/getWishList";
import Image from "next/image";
import AddToCartBtn from "../_components/button/AddToCartBtn";
import { deleteItem } from "./remove.actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function WishList() {
  const [wishList, setwishList] = useState<any>({
    count: 0,
    data: [],
  });

  async function handleDeleteItem(productId: string) {
    const res = await deleteItem(productId);
    toast.success("deleted sucssesfully", { position: "top-center" });
    const updatedWishList = await getWishlist();
    setwishList(updatedWishList);

     window.dispatchEvent(new Event("wishlistUpdated"));
  }

  useEffect(() => {
    async function fetchGetWishList() {
      const data = await getWishlist();
      console.log(`dataofwishhhh`, data);
      setwishList(data);
    }
    fetchGetWishList();
  }, []);

  return (
    <>
      <div className="bg-[#F0F3F2] mt-20 mb-10 md:mt-25 py-10 rounded-3xl  w-[95%] md:w-[85%] font-outfit container mx-auto overflow-auto">
        <div className="flex items-center w-[90%] md:w-[95%] mx-auto">
          <Link href="/products">
            <button className="bg-[var(--brand-primary)] me-5  px-2 py-1 cursor-pointer rounded-full  text-white hover:scale-105 hover:-translate-x-1 duration-300">
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </button>
          </Link>
          <h3 className="text-2xl font-bold text-[var(--brand-primary-dark)]">
            Favorite Products
          </h3>
          <i className="fa-brands fa-gratipay text-primary ms-2 text-[20px] text-[var(--brand-primary)]"></i>
        </div>
        {wishList.count <= 0 ? (
          <div className="text-center py-20">
            <h3 className="text-[var(--brand-primary-dark)] mb-3 font-medium">
              There are no items yet.
            </h3>
            <Link href="/products">
              <button
                type="button"
                className="text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] cursor-pointer  text-md rounded-md px-6 py-2"
              >
                Add your First Product To Favorite
              </button>
            </Link>
          </div>
        ) : (
          <div className="px-10">
            {wishList.data.map((currentProd : any) => {
              return (
                <div key={currentProd.id}>
                  <div className="flex mt-20 mb-10">
                    <div>
                      <Image
                        className="rounded-2xl outline-gray-300 outline-2"
                        src={currentProd.imageCover}
                        alt=""
                        width={200}
                        height={200}
                      ></Image>
                    </div>

                    <div className="ms-15 w-full">
                      <h2 className="text-[var(--brand-primary-dark)] text-xl font-bold mb-2">
                        {currentProd.title}
                      </h2>
                      <h5 className="text-[var(--brand-primary-dark)] mb-2">
                        Rate :
                        <i className="fa-solid fa-star text-[#ffc908] me-1 ms-2"></i>
                        <span className="text-[var(--brand-primary)]">
                          {currentProd.ratingsAverage}
                        </span>
                      </h5>
                      <h5 className="text-[var(--brand-primary-dark)] mb-2">
                        Price :
                        <span className="text-[var(--brand-primary)] ms-2">
                          EGP {currentProd.price}
                        </span>
                      </h5>
                      <p className="text-gray-500 text-sm mb-4">
                        {currentProd.category.name} | {currentProd.brand.name} |
                        <span className="text-[var(--brand-primary)]">
                          {currentProd.quantity < 0
                            ? "Not Available"
                            : " Available"}
                        </span>
                      </p>
                      <div className="flex  items-center">
                        <AddToCartBtn
                          productId={currentProd.id}
                          rounded="rounded-full"
                          width="w-1/2"
                        />
                        <button
                          onClick={() => handleDeleteItem(currentProd._id)}
                          type="button"
                          className="group ms-2"
                        >
                          <h2 className="bg-red-600 hover:bg-red-500 text-white rounded-3xl px-3 py-2 text-sm cursor-pointer">
                            <i className="group-hover:animate-shake fa-regular fa-trash-can me-1"></i>
                            Remove
                          </h2>
                        </button>
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-200 border-[1.5px] mt-5 mb-2" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
