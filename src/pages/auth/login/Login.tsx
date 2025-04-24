import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import furia_logo from "../../../assets/furia-logo.svg";
import { useNavigate } from "react-router";
import { FaXTwitter } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-96">
        <CardHeader>
          <img src={furia_logo} className="w-24" />
          <h1 className="font-bold text-xl">FURIAX</h1>
        </CardHeader>
        <Divider />

        <CardBody className="flex flex-col">
          <form className="flex flex-col gap-6">
            <Input label="Email" placeholder="Digite seu email..." />
            <Input label="Senha" placeholder="Digite sua senha..." />
            <Button color="primary">Entrar</Button>
          </form>
        </CardBody>

        <CardFooter className="flex flex-col items-center gap-5">
          <h2 className="font-bold text-md">Ainda não tem conta?</h2>
          <Button
            onPress={() => navigate("/register")}
            color="secondary"
            className="w-full"
          >
            Registrar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
