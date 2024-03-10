"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const [mode, setMode] = React.useState<"keyword" | "data">("data");

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      router.push(`/?${mode}=${search}`);
    }
  };

  return (
    <div
      className={`flex gap-4 border-2 ${
        isFocused ? "bg-accent" : "bg-transparent"
      } rounded-lg items-center pr-2 hover:bg-accent`}
    >
      <Input
        type="text"
        placeholder="Search"
        className="w-full border-none bg-transparent focus-visible:bg-transparent"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        // onSubmit={() => router.push(`/?query=${search}`)}
      />
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as "keyword" | "data")}
        className=" bg-transparent transition-colors duration-100 ease-in-out outline-none"
      >
        <option value="keyword">keyword</option>
        <option value="data">data</option>
      </select>
      {/* <button onClick={() => router.push(`/?query=${search}`)}>Search</button> */}
    </div>
  );
};

export default Search;
