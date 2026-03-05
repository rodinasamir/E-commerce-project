"use client";
import { cartContext } from "@/app/_context/CartContext";
import { addItemToCart } from "@/app/api/addToCart";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { toast } from "sonner";

interface AddToCartBtnProps {
  productId: string;
  rounded?: string;
  width?: string;
}

export default function AddToCartBtn2({
  productId,
  rounded = "rounded-md",
  width = "flex-1 min-w-0",
}: AddToCartBtnProps) {
  const { setCartData, setNumOfCartItems } = useContext(cartContext);

  async function handleAddItem() {
    const data = await addItemToCart(productId);
    if (data.status === "success") {
      toast.success(data.message, { position: "top-center" });
      setNumOfCartItems(data.numOfCartItems);
      setCartData(data.data);
    } else {
      toast.error("error");
    }
    console.log(`data`, data);
  }

  return (
    <Button onClick={handleAddItem} className="flex gap-4 pointer-events-auto">
      <span className="bg-[var(--brand-primary-soft)] hover:bg-[var(--brand-primary-dark)] cursor-pointer duration-300 rounded-full p-3">
        <i className="text-white text-[17px] fa-solid fa-cart-arrow-down"></i>
      </span>
    </Button>
  );
}
