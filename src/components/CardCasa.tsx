import { Casa } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { capitalizeParola } from "@/lib/utils";

export default function CardCasa({ casa }: { casa: Casa }) {
  
  return (
    <div className="flex flex-col h-full bg-white  transition duration-300">
      <div className="w-full aspect-square overflow-hidden rounded-2xl">
        <Link href={`/${casa.id}`} className="">
          <Image
            src={casa.image}
            alt="immagine"
            width={300}
            height={300}
            className="rounded-2xl w-full h-full  object-cover hover:scale-110 transition"
          />
        </Link>
      </div>

      <h1 className="text-lg font-semibold pt-2">{capitalizeParola(casa.title)}</h1>
      <p className="text-sm text-gray-500 flex items-center">
        {casa.price} € per 2 notti
        <span className="flex items-center pl-2">
          <Star className="size-3 mr-1" fill="" /> 4.9
        </span>
      </p>
    </div>
  );
}
