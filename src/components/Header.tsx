import React from "react";
import LoginButton from "./LoginButton";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Search from "./Search";
import { burrito } from "@/features/burrito";
import DevModeToggle from "./DevModeToggle";

const getNumEntrees = async () => {
  return await burrito.queryData<number>({
    query: "how many entries are there in the data.",
  });
};

const Header = async () => {
  const numEntrees = await getNumEntrees();

  return (
    <div className="w-full grid grid-cols-3 items-center">
      <div className="flex">
        <Link href="/" className="text-2xl font-bold">
          <Image
            width={150}
            height={100}
            src="/burritoplace.png"
            alt="wavy stylized text of burrito.place"
          />
        </Link>
      </div>
      <div className="justify-self-center w-4/5">
        <Search />
      </div>
      <div className="flex justify-end items-center gap-2">
        <div className="flex gap-4 pr-6 items-center">
          <Avatar>
            <AvatarImage src="/me.jpeg" alt="profile pic" />
            <AvatarFallback>CJ</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <b>CJ</b>
            <p className=" font-light text-xs">{numEntrees} ENTREES</p>
          </div>
        </div>
        <LoginButton />
        <DevModeToggle />
      </div>
    </div>
  );
};

export default Header;
