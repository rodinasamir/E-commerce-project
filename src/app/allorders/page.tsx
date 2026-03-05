import React from "react";
import { getUserOrders } from "./order.action";
import Link from "next/link";
import Image from "next/image";

export default async function AllOrders() {
  const orders = await getUserOrders();
  console.log(`orders`, orders);
  return (
    <div className="mt-20 mb-10 md:mt-30 w-[90%] mx-auto font-outfit">
      <div className="flex mb-10">
        <Link href="/products">
          <button className="bg-[var(--brand-primary)] me-5  px-2 py-1 cursor-pointer rounded-full  text-white hover:scale-105 hover:-translate-x-1 duration-300">
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
        </Link>
        <h3 className="text-2xl font-bold text-[var(--brand-primary-dark)]">
          Track your orders
          <i className="fa-solid fa-truck-fast ms-2 text-[var(--brand-primary)] font-black"></i>
        </h3>
      </div>
      <hr className="border-gray-300 border-dotted md:hidden" />
      <div>
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-[var(--brand-primary-dark)] mb-3 font-medium">
              There are no orders yet.
            </h3>
            <Link href="/products">
              <button
                type="button"
                className="text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] cursor-pointer text-md rounded-md px-6 py-2"
              >
                Add your First Product To Cart
              </button>
            </Link>
          </div>
        ) : (
          orders.map((currentorder: any) => (
            <div key={currentorder.id}>
              <div className="border-2 border-dotted p-4 rounded-2xl border-gray-300 my-5">
                <div className="flex justify-between mt-10">
                  <div className="text-[var(--brand-primary-dark)] md:flex md:gap-x-15">
                    <h3 className="font-semibold">
                      Transaction Number : #
                      <span className="font-normal">{currentorder.id}</span>
                    </h3>
                    <h3 className="font-semibold">
                      Placed on :
                      <span className="font-normal">
                        {currentorder.createdAt.slice(0, 10)}
                      </span>
                    </h3>
                    <h3 className="font-semibold">
                      Payment :
                      <span className="font-normal">
                        {currentorder.paymentMethodType}
                      </span>
                    </h3>
                  </div>
                  <div>
                    <Link href="/products">
                      <button className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] cursor-pointer rounded-md text-white py-1 px-2 text-sm">
                        Add New Items
                      </button>
                    </Link>
                  </div>
                </div>

                <hr className="border-gray-100 border-[1.5px] mt-5 mb-2" />

                <div className="md:flex md:flex-wrap">
                  {currentorder.cartItems.map((currentItem : any) => {
                    return (
                      <div key={currentItem.product.id}>
                        <div className="relative flex items-center mb-5">
                          <div>
                            <Image
                              src={currentItem.product.imageCover}
                              alt=""
                              width={200}
                              height={100}
                            ></Image>
                          </div>
                          <div className="ms-5">
                            <h4 className="font-medium text-[var(--brand-primary-dark)] mb-10  hover:text-[var(--brand-primary)] duration-300">
                              {currentItem.product.title}
                            </h4>
                            <h4 className="text-[var(--brand-primary-dark)] mb-1">
                              Price :
                              <span className="text-[var(--brand-primary)] ms-1 mb-1">
                                EGP {currentItem.price}
                              </span>
                            </h4>
                            <h4 className="text-[var(--brand-primary-dark)] mb-2">
                              Quantity :{" "}
                              <span className="text-[var(--brand-primary)]">
                                {currentItem.count}
                              </span>
                            </h4>
                            <p className="text-gray-500 text-sm mb-1">
                              {currentItem.product.category.name}
                            </p>
                            <p className="text-gray-500 text-sm mb-1">
                              {currentItem.product.brand.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <h4 className="text-[var(--brand-primary-dark)] font-semibold mb-1">
                    Products Quantity :
                    <span className="text-[var(--brand-primary)] ms-1 mb-1">
                      {currentorder.cartItems.length}
                    </span>
                  </h4>
                  <h4 className="text-[var(--brand-primary-dark)] font-semibold mb-1">
                    Shipping Price :
                    <span className="text-[var(--brand-primary)] ms-1 mb-1">
                      EGP {currentorder.shippingPrice}
                    </span>
                  </h4>
                  <h4 className="text-[var(--brand-primary-dark)] font-semibold mb-1">
                    taxes :
                    <span className="text-[var(--brand-primary)] ms-1 mb-1">
                      EGP {currentorder.taxPrice}
                    </span>
                  </h4>
                  <h4 className="text-[var(--brand-primary-dark)] font-semibold text-xl mb-1">
                    Total Order Price :
                    <span className="text-[var(--brand-primary)] ms-1 mb-1">
                      EGP {currentorder.totalOrderPrice}
                    </span>
                  </h4>
                </div>

                <hr className="border-gray-300 border-dotted mt-5 mb-20 md:hidden" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
