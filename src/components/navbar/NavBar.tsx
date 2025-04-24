import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/react";
import furia_logo from "../../assets/furia-logo.png";
import { Link } from "react-router";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const NavBar = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <Link className="flex gap-5 items-center" to="/home">
          <img src={furia_logo} className="w-10" />
          <p className="font-bold">FURIAX</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Avatar />
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem key={"perfil"}>
              <p className="flex gap-2 items-center">
                <FaUser />
                Perfil
              </p>
            </DropdownItem>

            <DropdownItem color="danger" className="text-danger" key={"logout"}>
              <p className="flex gap-2 items-center">
                <IoLogOut />
                Logout
              </p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
