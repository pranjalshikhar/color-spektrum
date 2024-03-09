import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { CaretDownIcon, ImageIcon, SymbolIcon } from "@radix-ui/react-icons";
import { toJpeg } from "html-to-image";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function Grainy() {
  const ref = useRef(null);

  const [direction, setDirection] = useState(null);
  const [from, setFrom] = useState(null);
  const [via, setVia] = useState(null);
  const [to, setTo] = useState(null);

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
        link.download = "Grainy_Gradient.jpg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
      });
  }, [ref]);

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

  console.clear();
  console.log(positionValuesReverse[direction], from, via, to);

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
            Grainy Gradient Generator
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <div>
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
          className={`${positionValuesReverse[direction]} ${from} ${via} ${to} h-[400px] w-[800px]`}
          ref={ref}
        >
          <CardContent>
            <div className="inset-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-25 brightness-100 contrast-150"></div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
