import { useAuth } from "../../context/auth/AuthContext";
import { Avatar } from "@heroui/react";
import EnthusiastBadge from "../../components/enthusiast_badge/EnthusiastBadge";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-content1 p-4 rounded-lg flex flex-col items-center w-8/12 gap-5">
        <Avatar size="lg" />
        <h1 className="text-2xl font-bold text-center mt-4">{user?.name}</h1>
        <EnthusiastBadge enthusiast_level={user?.enthusiast_level} />
        <p className="text-gray-600 text-center mt-2">
          @{user?.twitter_account || "Sem conta vinculada"}
        </p>
        <p className="text-gray-600 text-center mt-2">
          {user?.description || "Sem descrição"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
