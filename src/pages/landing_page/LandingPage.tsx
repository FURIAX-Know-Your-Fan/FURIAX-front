import { Button } from "@heroui/react";
import landingbg from "../../assets/bg2.webp";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen justify-center items-center relative">
      {/* Imagem de fundo com desfoque */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${landingbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)", // Efeito de blur na imagem de fundo
        }}
      />

      {/* Seção de conteúdo com animação suave usando Framer Motion */}
      <motion.div
        className="relative z-10 text-center p-6 max-w-lg bg-content1 rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 50 }} // Inicia com opacidade 0 e deslocamento vertical
        animate={{ opacity: 1, y: 0 }} // Anima para opacidade 1 e 0 de deslocamento
        transition={{ duration: 1 }} // Transição suave de 1 segundo
      >
        <motion.h1
          className="font-extrabold text-4xl mb-4 text-[#ffffff]"
          initial={{ opacity: 0 }} // Inicia invisível
          animate={{ opacity: 1 }} // Torna-se visível
          transition={{ duration: 1, delay: 0.2 }} // Anima com atraso de 0.2s
        >
          Bem-vindo ao FURIAX!
        </motion.h1>

        <motion.p
          className="text-lg mb-6 text-[#f4f4f5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Estamos super animados por você se juntar à nossa comunidade! 🤩 Aqui
          no FURIAX, nosso objetivo é saber o quanto você é fã da FURIA! 🦸‍♂️🦸‍♀️
        </motion.p>

        <motion.p
          className="text-lg mb-6 text-[#f4f4f5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Prepare-se para compartilhar sua paixão, acompanhar suas estatísticas
          e interagir com outros fãs incríveis. Quanto mais você interagir, mais
          benefícios exclusivos você ganha! 🎁
        </motion.p>

        <motion.p
          className="text-lg mb-6 text-[#f4f4f5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Seja o verdadeiro FURIAx! Vamos tornar essa jornada ainda mais épica
          juntos. 🦅💥
        </motion.p>

        {/* Call to Action com animação de escala */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Button onPress={() => navigate("/login")} color="primary">
            Entrar
          </Button>
          <Button onPress={() => navigate("/register")} color="primary">
            Cadastre-se
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
