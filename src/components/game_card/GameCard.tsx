import { Image } from "@heroui/react";
import React from "react";

const GameCard = ({
  game,
}: {
  game: {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
    has_community_visible_stats: boolean;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    playtime_deck_forever: number;
    rtime_last_played: number;
    img_logo_url: string;
  };
}) => {
  const image_url = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;

  const format_playtime = (playtime: number) => {
    const hours = Math.floor(playtime / 60);
    const minutes = playtime % 60;
    return `${hours}h ${minutes}m`;
  };
  return (
    <div className="bg-content2 p-2 rounded-xl flex flex-col items-center justify-center gap-2 h-full">
      <Image src={image_url} />
      <h2 className="font-bold text-">{game.name}</h2>
      <p>Horas jogadas: {format_playtime(game.playtime_forever)}</p>
    </div>
  );
};

export default GameCard;
