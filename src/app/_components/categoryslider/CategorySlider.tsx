import { getAllCategories } from "@/app/api/getALLCategories";
import React from "react";

export default async function CategorySlider() {
    const data = await getAllCategories();
    // console.log(data);
    
  return <div></div>;
}
