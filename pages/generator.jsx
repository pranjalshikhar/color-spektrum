"use client";

import Notification from "@/components/notification";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  positionDirections,
  positionValues,
  positionValuesReverse,
} from "@/data/directions";
import { createColorClasses } from "@/lib/createColors";
import { generateVanillaGradients } from "@/lib/generateCSS";
import {
  CaretDownIcon,
  CodeIcon,
  ImageIcon,
  MoonIcon,
  SunIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import { toJpeg } from "html-to-image";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Generator() {
  const ref = useRef(null);

  const [direction, setDirection] = useState(null);
  const [from, setFrom] = useState(null);
  const [via, setVia] = useState(null);
  const [to, setTo] = useState(null);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const pos =
      positionDirections[Math.floor(Math.random() * positionDirections.length)];
    setDirection(positionValues[pos]);
    setFrom(
      createColorClasses("from")[
        Math.floor(Math.random() * createColorClasses("from").length)
      ]
    );
    setVia(
      createColorClasses("via")[
        Math.floor(Math.random() * createColorClasses("to").length)
      ]
    );
    setTo(
      createColorClasses("to")[
        Math.floor(Math.random() * createColorClasses("to").length)
      ]
    );
  }, []);

  const handleCopy = (gradient, from, via, to) => {
    navigator.clipboard.writeText(`${gradient} ${from} ${via} ${to}`);
    toast(<Notification element={"tailwind"} />);
  };

  const handleRandom = () => {
    const pos =
      positionDirections[Math.floor(Math.random() * positionDirections.length)];
    setDirection(positionValues[pos]);
    setFrom(
      createColorClasses("from")[
        Math.floor(Math.random() * createColorClasses("from").length)
      ]
    );
    setVia(
      createColorClasses("via")[
        Math.floor(Math.random() * createColorClasses("to").length)
      ]
    );
    setTo(
      createColorClasses("to")[
        Math.floor(Math.random() * createColorClasses("to").length)
      ]
    );
  };

  const handleCopyVanilaCSS = (gradient, from, via, to) => {
    const code = generateVanillaGradients(gradient, from, via, to);
    navigator.clipboard.writeText(code);

    toast(<Notification element={"css"} />);
  };

  const handleDownloadImage = useCallback(() => {
    const node = ref.current;
    if (node === null) {
      return;
    }

    toJpeg(node, {
      width: node.offsetWidth * 4,
      height: node.offsetHeight * 4,
      quality: 1,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Gradient.jpg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
      });
  }, [ref]);

  console.clear();
  console.log(positionValuesReverse[direction], from, via, to);

  return (
    <>
      <Head>
        <title>Color Spektrum</title>
      </Head>
      <div className="flex flex-col justify-center items-center text-center pt-20 py-40">
        <div className="text-center font-black">
          <div className="bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Gradient generator for Tailwind CSS
          </div>
          <div className="uppercase bg-gradient-to-br from-fuchsia-500 via-green-500 to-orange-500 bg-clip-text text-transparent text-[50px]">
            Gradient Generator
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <div>
          {/* tailwind css */}
          <Button
            variant="secondary"
            size="icon"
            className="ml-2 rounded-lg hover:text-cyan-400"
            onClick={() =>
              handleCopy(positionValuesReverse[direction], from, via, to)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 54 33"
              className="h-4 w-4"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>

          {/* css */}
          <Button
            variant="secondary"
            size="icon"
            className="ml-2 hover:text-pink-500"
            onClick={() =>
              handleCopyVanilaCSS(
                positionValuesReverse[direction],
                from,
                via,
                to
              )
            }
          >
            <CodeIcon className="h-4 w-4" />
          </Button>

          {/* image */}
          <Button
            variant="secondary"
            size="icon"
            className="ml-2 hover:text-pink-700"
            onClick={handleDownloadImage}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>

          {/* random */}
          <Button
            variant="secondary"
            size="icon"
            className="ml-2 hover:text-pink-700"
            onClick={handleRandom}
          >
            <SymbolIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex">
          {/* direction */}
          <div className="mr-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[190px] flex justify-between rounded-md"
                >
                  <span>{direction}</span>
                  <CaretDownIcon className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 h-52 overflow-y-scroll dropdown">
                <DropdownMenuRadioGroup
                  value={direction}
                  onValueChange={setDirection}
                >
                  {positionDirections.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <DropdownMenuRadioItem value={positionValues[item]}>
                        {positionValues[item]}
                      </DropdownMenuRadioItem>
                    </React.Fragment>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* from */}
          <div className="mr-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[190px] flex justify-between rounded-md"
                >
                  <span>{from}</span>
                  <CaretDownIcon className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 h-52 overflow-y-scroll dropdown">
                <DropdownMenuRadioGroup value={from} onValueChange={setFrom}>
                  {createColorClasses("from")?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <DropdownMenuRadioItem value={item}>
                        {item}
                      </DropdownMenuRadioItem>
                    </React.Fragment>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* via */}
          <div className="mr-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[190px] flex justify-between rounded-md"
                >
                  <span>{via}</span>
                  <CaretDownIcon className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 h-52 overflow-y-scroll dropdown">
                <DropdownMenuRadioGroup value={via} onValueChange={setVia}>
                  {createColorClasses("via")?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <DropdownMenuRadioItem value={item}>
                        {item}
                      </DropdownMenuRadioItem>
                    </React.Fragment>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* to */}
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[190px] flex justify-between rounded-md"
                >
                  <span>{to}</span>
                  <CaretDownIcon className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 h-52 overflow-y-scroll dropdown">
                <DropdownMenuRadioGroup value={to} onValueChange={setTo}>
                  {createColorClasses("to")?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <DropdownMenuRadioItem value={item}>
                        {item}
                      </DropdownMenuRadioItem>
                    </React.Fragment>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex place-content-center my-40">
        <Card
          className={`${positionValuesReverse[direction]} ${from} ${via} ${to} h-[400px] w-[592px] mr-20`}
          ref={ref}
        >
          <CardContent></CardContent>
        </Card>
        <Card
          className={`${dark ? "bg-black" : "bg-white"} h-[400px] w-[592px]`}
        >
          <CardHeader>
            <Button
              variant="secondary"
              className="w-fit flex justify-between rounded-md"
              onClick={() => setDark((prev) => !prev)}
            >
              {dark ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent
            className={`${positionValuesReverse[direction]} ${from} ${via} ${to} bg-clip-text text-transparent text-xl font-black w-full text-center pt-20`}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
            cupiditate voluptatibus voluptatum itaque voluptas harum quasi quos.
          </CardContent>
        </Card>
      </div>
    </>
  );
}
