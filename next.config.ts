import type { NextConfig } from "next";

//https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg
//https://ecommerce.routemisr.com/Route-Academy-categories/1681511964020.jpeg
const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-products/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-categories/**",
      },
       {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-brands/**",
      }
    ],
  },
};

export default nextConfig;
