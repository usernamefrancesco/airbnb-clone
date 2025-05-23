import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import LoginMenu from "@/components/auth/LoginMenu";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share, Heart } from "lucide-react";

import ShareOne from "@/Share/ShareOne";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shareData = {
    title: "Share",
    text: "Share message",
    url: `http://localhost:3000/`,
  };
  return (
    <div>
      <div className="flex items-center justify-between px-5 border-b-[1px] border-gray-100 gap-1">
        <div className="hidden lg:block ">
          <Link href={"/"} >
            <Image
              src={"/proxy-image.png"}
              width={100}
              height={40}
              alt="logo"
              className="lg:w-[200px] lg:h-[150px]"
            />
          </Link>
        </div>

        <div className="w-full lg:w-3xl hidden lg:block">
          <SearchBar />
        </div>

        <div className="hidden lg:block">
          <LoginMenu />
        </div>
      </div>

      <div className="lg:hidden flex justify-between p-4 items-center ">
        <Link href={"/"}>
          <button>
            <ArrowLeft size={35} />
          </button>
        </Link>

        <div className="gap-8 flex">
          <div className="rounded-full aspect-square hover:bg-gray-200 p-2 px-3">
            <ShareOne shareData={shareData}>
              <span>
                <Share />
              </span>
            </ShareOne>
          </div>
          <button className="pr-4 rounded-full aspect-square hover:bg-gray-200 p-2 px-3">
            <Heart />
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}
