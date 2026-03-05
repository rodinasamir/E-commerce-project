"use client";
import { cartContext, CartContextType } from "@/app/_context/CartContext";
import { addItemToCart } from "@/app/api/addToCart";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { toast } from "sonner";

interface AddToCartBtnProps {
  productId: string;
  rounded?: string; 
  width?: string;
}

export default function AddToCartBtn({
  productId,
  rounded = "rounded-md",
  width = "flex-1 min-w-0",
}: AddToCartBtnProps) {
  const { setCartData, setNumOfCartItems } = useContext<CartContextType>(cartContext);

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
    <Button
      onClick={handleAddItem}
      type="button"
      className={`group text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] ${width} cursor-pointer ${rounded} text-sm py-3`}
    >
      <i className="text-white text-[17px] fa-solid fa-cart-plus me-2 group-hover:animate-shake"></i>
      ADD TO CART
    </Button>
  );
}
