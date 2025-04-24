import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { jwtDecode } from "jwt-decode";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Input,
} from "@heroui/react";
import furia_logo from "../../../../assets/furia-logo.svg";
import axios from "axios";
import { API_URL } from "../../../../utils/constants";

const VincularTwitter = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [twitter, setTwitter] = useState<string>("");
  const [authorize, setAuthorize] = useState<boolean>(false);

  if (!token) {
    addToast({
      title: "Token inválido",
      description: "O token de autenticação não foi encontrado.",
      color: "danger",
    });
    navigate("/auth/register");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id, name, email } = jwtDecode(token as string) as any;

  const handleAuthorize = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      return;
    }

    if (twitter.trim() === "") {
      addToast({
        title: "Atenção",
        description: "Informe seu @ do Twitter.",
        color: "warning",
      });
    }

    if (!authorize) {
      addToast({
        title: "Atenção",
        description: "Você deve concordar com os termos para continuar.",
        color: "warning",
      });
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await axios.post(
        `${API_URL}/user/auth/register/twitter`,
        {
          twitter,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      addToast({
        title: "Sucesso",
        description: response.data.message,
        color: "success",
      });

      // Redireciona para a página de login
      navigate("/login");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      addToast({
        title: "Erro",
        description: error.response.data.message,
        color: "danger",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-full ">
      <Card className="w-[45em]">
        <CardHeader className="flex   gap-5">
          <img src={furia_logo} className="w-24" />
          <h2 className="font-bold text-xl">
            Seja bem vindo ao FURIAX, {name.split(" ")[0]}!
          </h2>
        </CardHeader>

        <Divider />

        <CardBody className="flex flex-col items-center justify-center gap-5">
          <form onSubmit={handleAuthorize} className="flex flex-col  gap-5">
            <p className="font-bold">
              Para continuar, você deve concordar em vincular sua conta twitter
            </p>

            <Input
              onChange={(e) => setTwitter(e.target.value)}
              required
              label="Twitter"
              errorMessage="Informe seu @ do Twitter"
              startContent="@"
            />

            <Checkbox onChange={(e) => setAuthorize(e.target.checked)}>
              Estou ciente e concordo que o FURIAX poderá analisar minhas
              publicações públicas.
            </Checkbox>

            <p className="text-sm text-gray-500 font-light">
              Garantimos que o FURIAX não tem acesso a mensagens ou conteúdos
              privados. Somente publicações públicas são consideradas para
              análise.
            </p>

            <Button type="submit" color="primary">
              Continuar
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default VincularTwitter;
