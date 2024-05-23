"use client";
import React, { useEffect, useState } from "react";
import useMovie from "@/hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Watch = ({ params }: { params: { movieId: string } }) => {
  const router = useRouter();
  const id = params?.movieId;
  const { data } = useMovie(id as string);

  return (
    <div
      className="
  h-screen w-screen bg-black
  "
    >
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          className="text-white cursor-pointer"
          size={40}
          onClick={() => router.push("/")}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        src={data?.videoUrl}
        className="h-full w-full"
        autoPlay
        controls
      ></video>
    </div>
  );
};

export default Watch;
