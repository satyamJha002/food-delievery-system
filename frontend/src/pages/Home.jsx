import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col gap-4 justify-center items-center h-screen max-w-screen-sm mx-auto">
        <h1 className="text-4xl font-bold">Welcome to our restaurant</h1>
        <Button
          className="bg-black hover:bg-white hover:text-black flex items-center gap-2 w-full"
          onClick={() => {
            window.location.href = "/menu";
          }}
        >
          Menu
        </Button>
        <Button
          onClick={handleLogout}
          className="bg-black hover:bg-white hover:text-black flex items-center gap-2 w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Home;
