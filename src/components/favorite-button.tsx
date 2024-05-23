import axios from "axios";

import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import userFavorites from "@/hooks/uesFavorite";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const { mutate: mutateFavorites } = userFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoritesIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const udpatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      currentUser,
      favoriteIds: udpatedFavoriteIds,
    });

    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className="
  cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300
  "
      onClick={() => {
        toggleFavorites();
      }}
    >
      <Icon className="text-white " size={25} />
    </div>
  );
};

export default FavoriteButton;
