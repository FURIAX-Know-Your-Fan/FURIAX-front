import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import furia_logo from "../../../assets/furia-logo.svg";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/auth/AuthContext";

const LoginAdmin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

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

    console.log(user);

    navigate("/admin/dashboard");
  };
  return (
    <motion.div
      className="flex items-center justify-center h-full"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <motion.div className="w-96" variants={fadeInUp} custom={0}>
        <Card>
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
              FURIAX - Admin
            </motion.h1>
          </CardHeader>

          <Divider />

          <CardBody className="flex flex-col">
            <motion.form
              onSubmit={handleLogin}
              className="flex flex-col gap-6"
              variants={fadeInUp}
              custom={0.4}
            >
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
            </motion.form>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default LoginAdmin;
