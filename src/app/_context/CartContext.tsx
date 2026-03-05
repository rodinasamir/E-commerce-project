"use client";
import React, { createContext, useEffect, useState } from "react";
import { getUserCart } from "../api/getCartData";
import { Product } from "@/types/product.type";

interface CartData {
  totalCartPrice: number;
  items: Product[];
  products: Product[];
}

export interface CartContextType {
  cartData: CartData | null;
  numOfCartItems: number;
  cartId: number | string | null;
  setCartData: (data: CartData | null) => void;
  setNumOfCartItems: (num: number) => void;
}

export const cartContext = createContext<CartContextType>({
  cartData: null,
  numOfCartItems: 0,
  cartId: null,
  setCartData: () => {},
  setNumOfCartItems: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [numOfCartItems, setNumOfCartItems] = useState<number>(0);
  const [cartId, setCartId] = useState<number | string | null>(null);

  async function getData() {
    const userDataCart = await getUserCart();
    setCartData(userDataCart.data);
    setNumOfCartItems(userDataCart.numOfCartItems);
    setCartId(userDataCart.cartId);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cartData,
        numOfCartItems,
        cartId,
        setCartData,
        setNumOfCartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}