"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const [mode, setMode] = React.useState<"keyword" | "data">("keyword");

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      router.push(`/?${mode}=${search}`);
    }
  };

  return (
    <div className="flex gap-4 border-2 border-fuchsia-700 w-3/4 bg-transparent rounded-lg hover:bg-fuchsia-200 items-center pr-2">
      <input
        type="text"
        placeholder="Search"
        className=" placeholder-fuchsia-950 bg-transparent outline-none p-2 transition-colors duration-100 ease-in-out w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        // onSubmit={() => router.push(`/?query=${search}`)}
      />
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className=" text-fuchsia-900 bg-transparent hover:bg-fuchsia-200 transition-colors duration-100 ease-in-out outline-none"
      >
        <option value="keyword">keyword</option>
        <option value="data">data</option>
      </select>
      {/* <button onClick={() => router.push(`/?query=${search}`)}>Search</button> */}
    </div>
  );
};

export default Search;
