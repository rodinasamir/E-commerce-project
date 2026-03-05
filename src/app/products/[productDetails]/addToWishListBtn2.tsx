"use client";
import { addToWishlist } from "@/app/api/addToWishlist";
import { Button } from "@/components/ui/button";

export default function AddToWishListBtn2({
  productId,
}: {
  productId: string;
}) {
  async function handleAddItem() {
    const data = await addToWishlist(productId);

    console.log(`dtatttata`, data);
  }
  return (
    <>
      <Button onClick={handleAddItem} className="p-0 m-0">
        <span className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] cursor-pointer px-5 py-2 rounded-md me-3">
          <i className="text-white text-[17px] fa-regular fa-heart"></i>
        </span>
      </Button>
    </>
  );
}
