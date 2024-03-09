"use client";

import ColorCards from "@/components/color-card";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Color Spektrum</title>
      </Head>
      <div className="flex flex-col justify-center items-center text-center pt-20 py-40">
        <div className="text-center px-[450px]">
          <div className="bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 bg-clip-text text-transparent font-semibold">
            Gradient generator for Tailwind CSS
          </div>
          <div className="uppercase bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent text-[80px] leading-[4.5rem] font-bold">
            Spektrum
          </div>
          <div className="py-[40px] font-bold">
            A curated collection of beautiful Tailwind CSS gradients using the
            full range of Tailwind CSS colors. Easily copy and paste the class
            names, CSS or even save the gradients as an image.
          </div>
        </div>
        <ColorCards />
      </div>
    </>
  );
}
