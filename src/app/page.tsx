import MainSlider from "./_components/mainslider/MainSlider";
import SecSlider from "./_components/secslider/SecSlider";
import { getMyToken } from "./api/getMyToken";
import Products from "./products/page";

export default function Home() {
  return (
    <>
      <div className=" font-outfit">
        <MainSlider />
        <h3 className="text-[var(--brand-primary-dark)] my-6 px-4 md:px-10 lg:px-15 font-semibold text-lg">
          Shop now by popular categories
        </h3>
        <SecSlider/>
        <h2 className="relative text-center mt-20 text-3xl font-bold text-[#082f49] before:absolute before:w-60 before:h-1 before:-bottom-3 before:ms-25 before:bg-[var(--brand-primary)]">
          Shop now by popular products
        </h2>
        <Products />
      </div>
    </>
  );
}
