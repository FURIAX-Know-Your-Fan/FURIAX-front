import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useNavigate } from "react-router";
import furia_logo from "../../../assets/furia-logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/constants";
import { validate_cpf } from "../../../utils/validations/ValidateCpf";
import { motion, AnimatePresence } from "framer-motion";
import estados_sigla from "../../../json/estados_sigla.json";

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

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

  // useEffect(() => {
  //   if (!cpf) return;

  //   const timeout = setTimeout(() => {
  //     if (!validate_cpf(cpf)) {
  //       addToast({
  //         title: "CPF inválido",
  //         description: "Digite um CPF válido.",
  //         color: "danger",
  //       });
  //     }
  //     if (validate_cpf(cpf)) {
  //       addToast({
  //         title: "CPF válido",
  //         description: "CPF válido.",
  //         color: "success",
  //       });
  //     }
  //   }, 800); // 800ms após o usuário parar de digitar

  //   return () => clearTimeout(timeout); // limpa timeout se o CPF mudar antes do tempo
  // }, [cpf]);

  return (
    <div className="flex items-center justify-center h-full overflow-scroll">
      <motion.div
        className="flex items-center justify-center h-full"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.div className="w-[600px]" variants={fadeInUp} custom={0}>
          <Card className="flex flex-col gap-5">
            <CardHeader className="flex flex-col items-center gap-2">
              <motion.img
                src={furia_logo}
                className="w-24"
                variants={fadeInUp}
                custom={0.2}
              />
              <motion.h1
                className="font-bold text-xl"
                variants={fadeInUp}
                custom={0.3}
              >
                FURIAX
              </motion.h1>
            </CardHeader>
            <Divider />

            <CardBody className="flex flex-col gap-4">
              <motion.h2 className="font-bold" variants={fadeInUp} custom={0.4}>
                Registrar
              </motion.h2>
              <Divider />
              <form onSubmit={handleRegister} className="flex flex-col gap-6">
                <div className="flex items-center justify-center gap-4">
                  {/* Coluna 1 */}
                  <motion.div
                    className="flex flex-col gap-6 w-1/2"
                    variants={fadeInUp}
                    custom={0.5}
                  >
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

                    {/* Campo com animação de erro */}
                    <div>
                      <Input
                        isInvalid={passwordError}
                        required
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        label="Senha"
                      />
                      <AnimatePresence>
                        {passwordError && (
                          <motion.p
                            className="text-sm text-red-500 mt-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            As senhas não coincidem
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <Input
                        isInvalid={passwordError}
                        required
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        label="Confirmar Senha"
                      />
                      <AnimatePresence>
                        {passwordError && (
                          <motion.p
                            className="text-sm text-red-500 mt-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            As senhas não coincidem
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Coluna 2 */}
                  <motion.div
                    className="flex flex-col gap-6 w-1/2"
                    variants={fadeInUp}
                    custom={0.6}
                  >
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
                    {/* <Input
                      required
                      onChange={(e) => setState(e.target.value)}
                      errorMessage="Campo obrigatório"
                      label="Estado"
                    /> */}
                    <Select
                      label="Estado"
                      required
                      onChange={(e) => setState(e.target.value)}
                    >
                      {estados_sigla.UF.map((estado) => (
                        <SelectItem key={estado.sigla}>
                          {estado.nome}
                        </SelectItem>
                      ))}
                    </Select>
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
                  </motion.div>
                </div>

                <motion.div
                  variants={fadeInUp}
                  custom={0.7}
                  className="flex flex-col"
                >
                  <Button type="submit" color="primary">
                    Registrar
                  </Button>
                </motion.div>
              </form>
            </CardBody>

            <CardFooter className="flex flex-col items-center gap-5">
              <motion.h2
                className="font-bold text-md"
                variants={fadeInUp}
                custom={0.8}
              >
                Já tem conta?
              </motion.h2>
              <motion.div variants={fadeInUp} custom={0.9} className="w-full">
                <Button
                  onPress={() => navigate("/login")}
                  color="secondary"
                  className="w-full"
                >
                  Entrar
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
