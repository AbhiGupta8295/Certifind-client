import "../../app/globals.css";
// import Image from 'next/image';
import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

export default function Cards({ certificate }) {
  return (
    <div>
      <Card
        isFooterBlurred
        radius="lg"
        className="items-center border-double border-5 h-full object-cover w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
      >
        <p className="text-md text-black/80 text-center">
          {certificate.Category}
        </p>
        <Image
          alt="Certificate Preview"
          className=""
          src={`https://drive.google.com/thumbnail?id=${certificate.PreviewID}`}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-full shadow-small ml-1 z-10">
          <p className="text-sm text-black/100">{certificate.Title}</p>
          <Button
            className="text-tiny text-white bg-black/20"
            variant="Flat"
            color="Warning"
            radius="lg"
            size="md"
            onClick={() => window.open(certificate.Links, "_blank")}
          >
            View Certificate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
