"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { gradientsCore, positionDirections, positionValues } from "@/data/core";
import { CaretDownIcon, CodeIcon, ImageIcon } from "@radix-ui/react-icons";
import { toJpeg } from "html-to-image";
import React, { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

export default function ColorCards() {
  const childRefs = useRef(
    Array.from({ length: gradientsCore.length }, () => React.createRef())
  );
  const [position, setPosition] = useState(gradientsCore);

  const handleDirectionChange = (idx, newDirection) => {
    setPosition((prevPosition) => {
      const updatedPosition = [...prevPosition];
      updatedPosition[idx] = {
        ...updatedPosition[idx],
        direction: Object.keys(positionValues).find(
          (key) => positionValues[key] === newDirection
        ),
      };
      return updatedPosition;
    });
  };

  const handleCopy = (idx, gradient) => {
    navigator.clipboard.writeText(
      `${position[idx]?.direction} ${gradient.colors}`
    );
    toast(<Notification />);
  };

  const handleChildRef = useCallback(
    (index) => {
      const node = childRefs.current[index].current;
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
          link.download = "Spektrum.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [childRefs]
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* gradient */}
      {gradientsCore.map((gradient, idx) => (
        <div key={idx}>
          <Card
            className={`${position[idx]?.direction} ${gradient.colors} min-h-56`}
            ref={childRefs.current[idx]}
            id="gradientCard"
          >
            <CardContent></CardContent>
          </Card>

          {/* actions */}
          <div className="rounded-2xl h-fit w-fit bg-[#030712] p-4 relative top-[-25px]">
            <div className="py-2 flex">
              {/* dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[190px] flex justify-between rounded-md"
                  >
                    <span>{positionValues[position[idx]?.direction]}</span>
                    <CaretDownIcon className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 h-52 overflow-y-scroll dropdown">
                  <DropdownMenuRadioGroup
                    value={positionValues[position[idx]?.direction]}
                    onValueChange={(e) => handleDirectionChange(idx, e)}
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

              {/* tailwind css */}
              <Button
                variant="secondary"
                size="icon"
                className="ml-2 rounded-lg hover:text-cyan-400"
                onClick={() => handleCopy(idx, gradient)}
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
              >
                <CodeIcon className="h-4 w-4" />
              </Button>

              {/* image */}
              <Button
                variant="secondary"
                size="icon"
                className="ml-2 hover:text-lime-500"
                onClick={() => handleChildRef(idx)}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const Notification = () => {
  return (
    <span className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 54 33"
        className="h-4 w-4 mr-4 text-cyan-400"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
          clipRule="evenodd"
        ></path>
      </svg>
      Code Copied
    </span>
  );
};
