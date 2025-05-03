import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import React from "react";
import furia_logo from "../../../assets/furia-logo.svg";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../../context/auth/AuthContext";

const NavBarDashboard = () => {
  const { user, logout } = useAuth();
  return (
    <Navbar className="bg-content1">
      <NavbarBrand>
        <img src={furia_logo} alt="Furia Logo" className="h-20 rounded-full" />
        <p className="font-bold">FURIAX - Estatísticas</p>
      </NavbarBrand>
      <NavbarContent justify="center">
        <p>Bem vindo, {user?.name}!</p>
      </NavbarContent>
      <NavbarContent justify="end">
        <Button onPress={logout} color="danger">
          <MdLogout />
          Logout
        </Button>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBarDashboard;
