"use client";
import { useLogin } from "@/features/useLogin";
import React from "react";
import { deleteEntree } from "@/features/serverActions";

const DeleteButton = ({ hash }: { hash: string }) => {
  const { password } = useLogin();

  const handleDelete = async () => {
    const answer = prompt(
      "are you sure you want to delete this? type yes to confirm"
    );
    if (answer === "yes" && password) {
      const deleted = await deleteEntree(hash, password);
      if (!deleted) {
        alert("failed to delete");
      }
    }
  };

  if (!password) return null;

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg py-[2px] w-6 text-xs border text-red-700 border-red-700 hover:bg-red-300"
    >
      x
    </button>
  );
};

export default DeleteButton;
