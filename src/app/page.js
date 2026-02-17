import Brands from "@/components/Home/Brands";
import BrowseByDressStyle from "@/components/Home/BrowseByDressStyle";
import Hero from "@/components/Home/Hero";
import Image from "next/image";

export const metadata = {
  title: "Home",
  description: "Home Page",
  keywords: ["home", "swift mart", "e-commerce", "fashion", "clothing"],
};

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Brands></Brands>
      <BrowseByDressStyle></BrowseByDressStyle>
    </div>
  );
}
