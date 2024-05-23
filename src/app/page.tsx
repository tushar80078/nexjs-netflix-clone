"use client";
import Navbar from "@/components/navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BillBoard from "./billboard/page";
import MovieList from "./movielist/page";
import useMovieList from "@/hooks/useMovieList";
import userFavorites from "@/hooks/uesFavorite";
import InfoModal from "@/components/info-modal";
import useInfoModel from "@/hooks/useInfoModal";

export default function Home() {
  const { data: movesData = [] } = useMovieList();
  const { data: favorites = [] } = userFavorites();
  const { isOpen, closeModal } = useInfoModel();

  return (
    <div>
      <InfoModal
        visible={isOpen}
        onClose={() => {
          closeModal();
        }}
      />
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movesData} />
        <MovieList title="My List" data={favorites} />
      </div>
    </div>
  );
}
