import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../SearchBar";
import LoginMenu from "../auth/LoginMenu";
import { creaUserDb } from "@/action/user.action";
import { currentUser } from "@clerk/nextjs/server";

export default async function NavbarHome() {
  const autenticazione = await creaUserDb()
  const user = await currentUser()
  

 

  return (
    <div className="flex items-center justify-between px-5 border-b-[1px] border-gray-100 gap-1">
      <div className="hidden lg:block ">
        <Link href={"/"}>
          <Image
            src={'/proxy-image.png'}
            width={100}
            height={40}
            alt="logo"
            className="lg:w-[200px] lg:h-[150px]"
          />
        </Link>
      </div>

      <div className="w-full lg:w-3xl">
        <SearchBar />
      </div>

      <div className="hidden sm:block">
        <LoginMenu />
      </div>
    </div>
  );
}
