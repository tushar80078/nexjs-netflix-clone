import Image from "next/image";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./favorite-button";
import { useRouter } from "next/navigation";
import useInfoModel from "@/hooks/useInfoModal";
import { BiChevronDown } from "react-icons/bi";

interface MoveCardProps {
  data: Record<string, any>;
}

const MoveCard = ({ data }: MoveCardProps) => {
  const router = useRouter();
  const { openModal } = useInfoModel();
  return (
    <div className="group bg-zinc-900 col-span-1 relative h-[12vw]">
      <Image
        className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-md group-hover:opacity-0 delay-300 w-full h-[12vw]"
        src={data.thumbnailUrl}
        alt="Thumbnail"
        layout="fill"
      />
      <div className="opacity-0 absolute top-0 transition duration-300 z-10 sm:visible delay-300 w-full h-full scale-0 group-hover:scale-105 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <Image
          src={data.thumbnailUrl}
          alt="Thumbnail"
          layout="fill"
          className="cursor-pointer object-cover transition shadow-xl rounded-t-md w-full h-[12vw] rounded-b-md"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute top-[12vw] h-full bottom-0 w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer bg-white w-6 h-6 lg:w-10 lg:h-10 rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => {
                router.push(`/watch/${data?.id}`);
              }}
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div
              onClick={() => openModal(data?.id)}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              <BiChevronDown
                size={30}
                className="text-white group-hover/item:text-neutral-300 w-4 "
              />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>

          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>

          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveCard;
