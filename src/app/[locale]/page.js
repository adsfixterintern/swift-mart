import Brands from "@/components/Home/Brands";
import BrowseByDressStyle from "@/components/Home/BrowseByDressStyle";
import Hero from "@/components/Home/Hero";
import Image from "next/image";
import Products from "./products/page";
import ReviewSlider from "@/components/Home/ReviewSlider/ReviewSlider";
<<<<<<< HEAD:src/app/page.js
import TopSelling from "./topselling/page";
import FlashSale from "@/components/FlashSale/page";
=======
import SpinWheelModal from "@/app/[locale]/SpinWheelModal/SpinWheelModal";
>>>>>>> development:src/app/[locale]/page.js

import TopSelling from "@/app/[locale]/topselling/page";
export const metadata = {
  title: "Home",
  description: "Home Page",
  keywords: ["home", "swift mart", "e-commerce", "fashion", "clothing"],
};

export default function Home() {
  return (
    <div>
      <SpinWheelModal></SpinWheelModal>
      <Hero></Hero>
      <Brands></Brands>
      <Products></Products>
      <TopSelling></TopSelling>
      <FlashSale></FlashSale>
      <BrowseByDressStyle></BrowseByDressStyle>
      <ReviewSlider></ReviewSlider>
    </div>
  );
}
