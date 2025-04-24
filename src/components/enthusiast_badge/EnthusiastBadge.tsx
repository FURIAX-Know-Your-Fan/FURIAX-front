const EnthusiastBadge = ({
  enthusiast_level,
}: {
  enthusiast_level: string | undefined;
}) => {
  const levelColors: { [key: string]: string } = {
    "Não Medido": "bg-gray-400 text-content3",
    Casual: "bg-yellow-400",
    Engajado: "bg-green-400",
    Hardcore: "bg-red-600",
  };

  const levelIcons: { [key: string]: string } = {
    "Não Medido": "❓",
    Casual: "😌",
    Engajado: "😃",
    Hardcore: "🤩",
  };
  return (
    <div
      className={`rounded-full text-small font-bold p-2 ${
        levelColors[enthusiast_level as string]
      }`}
    >
      {levelIcons[enthusiast_level as string]} {enthusiast_level}
    </div>
  );
};

export default EnthusiastBadge;
