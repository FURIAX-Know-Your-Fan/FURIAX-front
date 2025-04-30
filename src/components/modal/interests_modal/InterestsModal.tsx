import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { interests } from "../../../utils/interests";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosSend, IoMdAdd } from "react-icons/io";
import axiosInstance from "../../../utils/axios/AxiosInstance";
import { useAuth } from "../../../context/auth/AuthContext";

const InterestsModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const [selectedInterests, setSelectedInterests] = useState<
    { title: string; value: string }[]
  >([]);
  const { user } = useAuth();

  const select_interest = (interest: { title: string; value: string }) => {
    if (selectedInterests.some((i) => i.value === interest.value)) {
      setSelectedInterests(
        selectedInterests.filter((i) => i.value !== interest.value)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const remove_interest = (interest: { title: string; value: string }) => {
    setSelectedInterests(
      selectedInterests.filter((i) => i.value !== interest.value)
    );
  };

  const handleAnswerInterests = async () => {
    if (selectedInterests.length === 0) {
      addToast({
        title: "Atenção",
        description: "Selecione pelo menos um interesse",
        color: "warning",
      });
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await axiosInstance.post("/user/answer/interests", {
        interests: selectedInterests.map((interest) => {
          return interest.value;
        }),
      });

      addToast({
        title: "Sucesso",
        description: res.data.message,
        color: "success",
      });

      if (user) {
        user.answered_questions = true;
      }

      onOpenChange(false);

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
    <Modal
      size="3xl"
      className="dark text-white"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col">
          <h2>Quais são seus interesses?</h2>
          <p className="font-light">
            Responda essa rápida pesquisa para continuar!
          </p>
        </ModalHeader>

        <ModalBody className="flex flex-col gap-7">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Clique nos elementos que você tem mais interesse!
          </motion.p>

          {selectedInterests.length > 0 && (
            <>
              <h3>Selecionados:</h3>
              <div className="flex flex-wrap gap-2 items-center justify-center">
                <AnimatePresence>
                  {selectedInterests.map((interest, index: number) => (
                    <motion.div
                      role="button"
                      onClick={() => remove_interest(interest)}
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center p-2 bg-secondary rounded-xl cursor-pointer hover:bg-secondary/80 transition-all duration-200 font-bold"
                    >
                      <IoClose />
                      <h3 className="whitespace-nowrap">{interest.title}</h3>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

          <div className="flex flex-wrap gap-2 items-center justify-center">
            <AnimatePresence>
              {interests.map((interest, index: number) => {
                if (selectedInterests.includes(interest)) {
                  return null;
                }
                return (
                  <motion.div
                    role="button"
                    onClick={() => select_interest(interest)}
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="flex items-center p-2 bg-warning rounded-xl cursor-pointer hover:bg-warning/80 transition-all duration-200 font-bold"
                  >
                    <h3 className="whitespace-nowrap flex items-center">
                      <IoMdAdd />
                      {interest.title}
                    </h3>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button onPress={handleAnswerInterests} color="primary">
              <IoIosSend /> Enviar
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InterestsModal;
