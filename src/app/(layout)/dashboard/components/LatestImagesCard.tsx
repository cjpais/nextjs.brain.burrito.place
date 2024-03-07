import Card from "@/components/Card";
import React from "react";
import Separator from "./Separator";
import { BurritoPeer, PEERS, getAuth } from "@/features/peers";
import Slideshow from "./Slideshow";

type PhotoData = {
  hash: string;
  created: number;
  userData: string;
  location: string;
  caption: string;
  description: string;
  title: string;
};

export type PeerPhoto = {
  peer: BurritoPeer;
  photo: PhotoData;
};

const getLatestImage = async () => {
  const images = await Promise.all(
    PEERS.map((peer) =>
      fetch(`${peer.url}/query/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuth(peer.name)}`,
        },
        body: JSON.stringify({
          query: "can you get the latest photo? please return all the data",
        }),
        next: { revalidate: 300 },
      })
        .then((r) => r.json())
        .then((d) => ({ peer, photo: d } as PeerPhoto))
        .catch((e) => {
          console.error(`error for peer ${peer.name}`, e);
          return null;
        })
    )
  );

  const filtered = images
    .filter((i) => i !== null)
    .filter((i) => i?.photo.hash !== undefined) as PeerPhoto[];

  return filtered.sort((a, b) => b.photo.created - a.photo.created);
};

const LatestImagesCard = async () => {
  return (
    <Card>
      <LatestImagesContent />
    </Card>
  );
};

export const LatestImagesContent = async () => {
  const images = await getLatestImage();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl">Friends Photos</h2>
      <Separator type="horizontal" />
      <Slideshow photos={images} />
      {/*  */}
    </div>
  );
};

export default LatestImagesCard;
