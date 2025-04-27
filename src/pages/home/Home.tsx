import { Avatar, Button, Textarea } from "@heroui/react";

const Home = () => {
  return (
    <div className="flex flex-col h-screen items-center gap-6 p-7">
      <div className="justify-center bg-content1 w-[90%] p-2 rounded-lg">
        <div className="flex gap-4">
          <Avatar />
          <Textarea placeholder="FURIA?!" />
        </div>
        <div className="flex justify-end mt-2">
          <Button color="primary">Postar</Button>
        </div>
      </div>

      <div className="bg-content1 p-5 w-[90%] rounded-lg h-[90%]">
        <h1 className="font-bold text-xl">Posts Recentes</h1>
      </div>
    </div>
  );
};

export default Home;
