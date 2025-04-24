import {
  addToast,
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
import { useAuth } from "../../../context/auth/AuthContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      addToast({
        title: "Atenção",
        description: "Preencha todos os campos",
        color: "warning",
      });
      return;
    }
    setLoading(true);
    await login(email, password);
    setLoading(false);

    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-96">
        <CardHeader>
          <img src={furia_logo} className="w-24" />
          <h1 className="font-bold text-xl">FURIAX</h1>
        </CardHeader>
        <Divider />

        <CardBody className="flex flex-col">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <Input
              required
              errorMessage="Preencha seu email"
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
            <Input
              required
              errorMessage="Preencha sua senha"
              onChange={(e) => setPassword(e.target.value)}
              label="Senha"
              type="password"
            />
            <Button isLoading={loading} type="submit" color="primary">
              Entrar
            </Button>
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
