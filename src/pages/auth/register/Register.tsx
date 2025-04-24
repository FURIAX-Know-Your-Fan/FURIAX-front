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
import { useNavigate } from "react-router";
import furia_logo from "../../../assets/furia-logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/constants";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  useEffect(() => {
    if (password.trim() === "" || confirmPassword.trim() === "") {
      setPasswordError(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
    }

    if (password === confirmPassword) {
      setPasswordError(false);
    }
  }, [password, confirmPassword]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordError) {
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await axios.post(`${API_URL}/user/auth/register`, {
        username,
        name,
        email,
        password,
      });
      addToast({
        title: "Sucesso",
        description: response.data.message,
        color: "success",
      });
      navigate(`/register/twitter/${response.data.token}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.response.data.message);
      addToast({
        title: "Erro",
        description: err.response.data.message,
        color: "danger",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="flex items-center justify-center h-full">
        <Card className="w-96">
          <CardHeader>
            <img src={furia_logo} className="w-24" />
            <h1 className="font-bold text-xl">FURIAX</h1>
          </CardHeader>
          <Divider />

          <CardBody className="flex flex-col">
            <form onSubmit={handleRegister} className="flex flex-col gap-6">
              <h2 className="font-bold">Registrar</h2>
              <Input
                required
                onChange={(e) => setName(e.target.value)}
                errorMessage="Campo obrigatório"
                label="Nome"
              />
              <Input
                required
                onChange={(e) => setUsername(e.target.value)}
                errorMessage="Campo obrigatório"
                label="Nome de Usuário"
              />
              <Input
                required
                onChange={(e) => setEmail(e.target.value)}
                errorMessage="Campo obrigatório"
                label="Email"
              />
              <Input
                isInvalid={passwordError}
                required
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                errorMessage="As senhas não coicidem"
                label="Senha"
              />
              <Input
                isInvalid={passwordError}
                required
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                errorMessage="As senhas não coicidem"
                label="Confirmar Senha"
              />
              <Button type="submit" color="primary">
                Registrar
              </Button>
            </form>
          </CardBody>

          <CardFooter className="flex flex-col items-center gap-5">
            <h2 className="font-bold text-md">Já tem conta?</h2>
            <Button
              onPress={() => navigate("/login")}
              color="secondary"
              className="w-full"
            >
              Entrar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
