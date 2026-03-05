"use client";
import { useContext } from "react";
import Link from "next/link";
import { cartContext } from "../_context/CartContext";
import Image from "next/image";
import { Product } from "./../../types/product.type";
import { Minus, Plus } from "lucide-react";
import { updateCount } from "./UpdateCount.action";
import { toast } from "sonner";
import { clearCart, deleteItem } from "./deleteItem.action";
import { clsx } from "clsx";

export default function Carts() {
  const { numOfCartItems, cartData, setNumOfCartItems, setCartData } =
    useContext(cartContext);

  type cartDataItem = {
    count: number;
    price: number;
    product: Product;
  };

  async function handleCountUpdate(productId: string, count: number) {
    toast.promise(() => updateCount(productId, count), {
      success: function (cartItemsRes) {
        setCartData(cartItemsRes.data);
        setNumOfCartItems(cartItemsRes.numOfCartItems);
        return "updated sucssesfully";
      },
      loading: "loading.....",
      error: "error!!!",
      position: "top-center",
      richColors: true,
    });
  }

  async function handleDeleteItem(productId: string) {
    const res = await deleteItem(productId);
    console.log(res);
    setCartData(res.data);
    setNumOfCartItems(res.numOfCartItems);
    toast.success("deleted sucssesfully", { position: "top-center" });
  }

  async function handleClear() {
    const res = await clearCart();
    console.log(res);
    setCartData(null);
    setNumOfCartItems(0);
    toast.success("Cart deleted sucssesfully", { position: "top-center" });
  }

  return (
    <div className="bg-[#F0F3F2] mt-20 mb-10 md:mt-25 py-10 rounded-3xl  w-[95%] md:w-[85%] font-outfit container mx-auto overflow-auto">
      <div className="flex items-center w-[90%] md:w-[95%] mx-auto">
        <Link href="/products">
          <button className="bg-[var(--brand-primary)] me-5  px-2 py-1 cursor-pointer rounded-full  text-white hover:scale-105 hover:-translate-x-1 duration-300">
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
        </Link>
        <h3 className="text-2xl font-bold text-[var(--brand-primary-dark)]">Shop Cart</h3>
        <i className="fa-brands fa-opencart text-primary ms-2 text-[20px] text-[var(--brand-primary)]"></i>
      </div>

      {numOfCartItems <= 0 ? (
        <div className="text-center py-20">
          <h3 className="text-[var(--brand-primary-dark)] mb-3 font-medium">
            There are no items yet.
          </h3>
          <Link href="/products">
            <button
              type="button"
              className="text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] cursor-pointer  text-md rounded-md px-6 py-2"
            >
              Add your First Product To Cart
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-[90%] mx-auto">
          <div className="flex flex-col items-end justify-end -my-7">
            <h4 className="text-[var(--brand-primary-dark)] font-semibold mb-2">
              Total Price <span className="ms-1">:</span>
              <span className="text-[var(--brand-primary)]  ms-2">
                EGP {cartData?.totalCartPrice}
              </span>
            </h4>
            <button className="text-xs text-[var(--brand-primary)] outline-1 cursor-pointer outline-gray-800 rounded-sm mx-10 p-1 bg-white">
              <Link href="/carts/checkout">Check Out</Link>
            </button>
          </div>

          {cartData?.products.map((item: any) => {
            return (
              <div key={item.product._id} className="flex mt-20 mb-10">
                <div>
                  <Image
                    className="rounded-2xl outline-gray-300 outline-2"
                    src={item.product.imageCover}
                    alt=""
                    width={200}
                    height={200}
                  ></Image>
                </div>

                <div className="ms-15 w-full">
                  <h2 className="text-[var(--brand-primary-dark)] text-xl font-bold mb-2">
                    {item.product.title}
                  </h2>
                  <h5 className="text-[var(--brand-primary-dark)] mb-2">
                    Rate :
                    <i className="fa-solid fa-star text-[#ffc908] me-1 ms-2"></i>
                    <span className="text-[var(--brand-primary)]">
                      {item.product.ratingsAverage}
                    </span>
                  </h5>
                  <h5 className="text-[var(--brand-primary-dark)] mb-2">
                    Price :
                    <span className="text-[var(--brand-primary)] ms-2">
                      EGP {item.price}
                    </span>
                  </h5>
                  <p className="text-gray-500 text-sm mb-4">
                    {item.product.category.name} | {item.product.brand.name} |
                    <span className="text-[var(--brand-primary)]">
                      {item.product.quantity < 0
                        ? "Not Available"
                        : " Available"}
                    </span>
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="">
                      <button
                        type="button"
                        className="outline-2 flex items-center font-bold text-[var(--brand-primary-dark)] outline-gray-400 py-1 px-3  rounded-2xl"
                        aria-label="Decrease quantity"
                      >
                        <Minus
                          onClick={() =>
                            handleCountUpdate(item.product._id, item.count - 1)
                          }
                          className="w-4 h-4 me-3 cursor-pointer"
                        />
                        {item.count}
                        <Plus
                          onClick={() =>
                            handleCountUpdate(item.product._id, item.count + 1)
                          }
                          className="w-4 h-4 ms-3 cursor-pointer"
                        />
                      </button>
                    </div>
                    <div className="text-xs font-medium ">
                      <h6 className="text-[var(--brand-primary-dark)]">Total Price</h6>
                      <h6 className="text-[var(--brand-primary)]">EGP {item.price}</h6>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.product._id)}
                    >
                      <h2 className="text-red-600 text-sm cursor-pointer">
                        <i className=" fa-regular fa-trash-can me-1"></i>
                        Remove Item
                      </h2>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-end text-sm">
            <button
              onClick={handleClear}
              className="bg-red-600 cursor-pointer text-white px-2 py-1 rounded-md"
            >
              {" "}
              <i className=" fa-regular fa-trash-can me-1"></i>Clear All
              products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
