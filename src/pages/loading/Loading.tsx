import { Spinner } from "@heroui/react";

const Loading = () => {
  return (
    <div className="dark h-full flex flex-col gap-6 justify-center items-center">
      <Spinner size="lg" />
      <p className="font-bold flex gap-1">
        Carregando
        <span className="animate-bounce-dot animation-delay-0">.</span>
        <span className="animate-bounce-dot animation-delay-200">.</span>
        <span className="animate-bounce-dot animation-delay-400">.</span>
      </p>
    </div>
  );
};

export default Loading;
