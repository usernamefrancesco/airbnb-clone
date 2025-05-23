"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { SignIn, useUser } from "@clerk/nextjs";
import { getUserImage } from "@/action/user.action";

export default function LoginMenu() {
  const [showLogin, setShowLogin] = useState(false);
  const user = useUser();
  const [image , setImage] = useState('https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftoppng.com%2Fpublic%2Fuploads%2Fpreview%2Fclear-11550721271xzehwonrlp.png&sp=1747571426Tf5039c35663a166706c5dbc74205c284a7766b889a0ea8047da9bc556c25a69a')

  function handleClick() {
    setShowLogin(true);
  }

  function closeLogin() {
    setShowLogin(false);
  }


  useEffect(()=> {
    async function imageUser(){
      const imageOfUser = await getUserImage()
      setImage(imageOfUser as string)
    }
    imageUser()
  }, [])

  return user.isSignedIn ? (
    <div className="flex justify-center items-center">

      <Image  src={image} alt="immagine" width={100} height={100} className="rounded-full w-[50px] h-[50px]"/>
    </div>
  ) : (
    <div className="relative border-[1px] rounded-full p-2 hover:shadow-lg transition">
      <div className="flex items-center justify-between gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-between gap-2">
              <button>
                <Menu />
              </button>
              <Image
                src={
                  "https://static.vecteezy.com/system/resources/previews/018/765/757/large_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                }
                alt="user"
                width={36}
                height={36}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <button onClick={handleClick}>Sign-up</button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={handleClick}>Login</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeLogin}
            >
              ✕
            </button>
            <SignIn oauthFlow="popup" routing="hash" />
          </div>
        </div>
      )}
    </div>
  );
}
