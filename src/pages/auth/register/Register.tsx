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
import { validate_cpf } from "../../../utils/validations/ValidateCpf";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [cpf, setCpf] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [number, setNumber] = useState<string>("");

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

    if (!validate_cpf(cpf)) {
      addToast({
        title: "Erro",
        description: "CPF inválido",
        color: "danger",
      });
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await axios.post(`${API_URL}/user/auth/register`, {
        username,
        name,
        email,
        password,
        city,
        street,
        cep,
        number,
        state,
        cpf,
        complement,
      });
      addToast({
        title: "Sucesso",
        description: response.data.message,
        color: "success",
      });
      //navigate(`/register/twitter/${response.data.token}`);
      navigate(`/document/validation/${response.data.token}/${cpf}`);
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

  const formatCpf = (value: string) => {
    value = value.replace(/\D/g, ""); // remove tudo que não for número
    value = value.slice(0, 11); // limita no máximo 11 dígitos

    // formata o CPF
    if (value.length > 9) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
      return value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
      return value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }
    return value;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpf(e.target.value);
    setCpf(formatted);
  };

  return (
    <div className="flex items-center justify-center h-full overflow-scroll">
      <div className="flex items-center justify-center h-full">
        <Card className="w-[600px] flex flex-col gap-5">
          <CardHeader>
            <img src={furia_logo} className="w-24" />
            <h1 className="font-bold text-xl">FURIAX</h1>
          </CardHeader>
          <Divider />

          <CardBody className="flex flex-col gap-4">
            <h2 className="font-bold">Registrar</h2>
            <Divider />
            <form onSubmit={handleRegister} className="flex flex-col gap-6">
              <div className="flex  items-center justify-center gap-4">
                <div className="flex flex-col gap-6 w-1/2">
                  <h2>Dados Pessoais</h2>
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
                    errorMessage="Campo obrigatório"
                    label="CPF"
                    onChange={handleCpfChange}
                    value={cpf}
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
                </div>

                <div className="flex flex-col gap-6 w-1/2">
                  <h2>Endereço</h2>
                  <Input
                    label="CEP"
                    required
                    errorMessage="Campo obrigatório"
                    onChange={(e) => setCep(e.target.value)}
                  />

                  <Input
                    required
                    onChange={(e) => setCity(e.target.value)}
                    errorMessage="Campo obrigatório"
                    label="Cidade"
                  />

                  <Input
                    label="Rua"
                    required
                    errorMessage="Campo obrigatório"
                    onChange={(e) => setStreet(e.target.value)}
                  />

                  <Input
                    required
                    onChange={(e) => setState(e.target.value)}
                    errorMessage="Campo obrigatório"
                    label="Estado"
                  />

                  <Input
                    label="Complemento"
                    required
                    errorMessage="Campo obrigatório"
                    onChange={(e) => setComplement(e.target.value)}
                  />

                  <Input
                    label="Número"
                    required
                    errorMessage="Campo obrigatório"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
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
