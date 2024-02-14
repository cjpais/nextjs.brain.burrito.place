"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      router.push(`/?query=${search}`);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Emoji Search"
        className="border-2 border-fuchsia-700 placeholder-fuchsia-950 bg-transparent rounded-lg p-2 w-3/4 hover:bg-fuchsia-200 outline-none focus:bg-fuchsia-200 transition-colors duration-100 ease-in-out"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        // onSubmit={() => router.push(`/?query=${search}`)}
      />
      {/* <button onClick={() => router.push(`/?query=${search}`)}>Search</button> */}
    </>
  );
};

export default Search;
