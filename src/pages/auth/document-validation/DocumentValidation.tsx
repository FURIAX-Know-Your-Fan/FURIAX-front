import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  Skeleton,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaCheckCircle, FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi2";
import { IoDocumentOutline } from "react-icons/io5";
import { RiFileUserLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { API_DOCUMENT_VALIDATION_URL } from "../../../utils/constants";
import { motion, AnimatePresence } from "framer-motion";

const DocumentValidation = () => {
  const { token, cpf } = useParams();
  const navigate = useNavigate();

  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [cnhFile, setCnhFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSucess] = useState<boolean | null>(false);

  if (!token) {
    return <div>Token não encontrado</div>;
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "selfie" | "cnh"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      if (type === "selfie") {
        setSelfieFile(file);
        setLoading(false);
      } else if (type === "cnh") {
        setCnhFile(file);
        setLoading(false);
      }
    }
  };

  const handleRemoveFile = (type: "selfie" | "cnh") => {
    if (type === "selfie") {
      setSelfieFile(null);
    } else if (type === "cnh") {
      setCnhFile(null);
    }
  };

  // TODO ADICIONAR CAMPO NO MODELO PARA VER SE OS DOCS FORAM VALIDADOS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selfieFile || !cnhFile) {
      addToast({
        title: "Erro",
        description: "Envie todos os arquivos",
        color: "danger",
      });
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("selfie", selfieFile);
      form.append("document", cnhFile);
      form.append("user_cpf", cpf ?? "");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await axios.post(
        `${API_DOCUMENT_VALIDATION_URL}/validate/documents`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success === false) {
        console.log(res.data);
        addToast({
          title: "Erro",
          description: res.data.error,
          color: "danger",
        });
        setLoading(false);
        return;
      }

      console.log(res);

      addToast({
        title: "Sucesso",
        description: res.message,
        color: "success",
      });

      setSucess(true);
      setSelfieFile(null);
      setCnhFile(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      addToast({
        title: "Erro",
        description: "Erro ao validar documentos, tente novamente mais tarde.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate(`/register/twitter/${token}`);
      }, 4000); // 4 segundos
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full flex items-center justify-center"
      >
        <Card className="w-[80%] flex flex-col gap-5">
          <CardHeader>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl font-bold flex gap-2 items-center"
            >
              <IoDocumentOutline /> Valicação de identidade
            </motion.h1>
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Envie uma Selfie e uma foto da sua CNH para validar sua
              identidade.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="font-bold"
            >
              Atenção: Envie em boa resolução e iluminação
            </motion.p>

            <AnimatePresence mode="wait">
              {success === true && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center gap-4 p-5 bg-content2 rounded-xl"
                >
                  <FaCheckCircle className="text-8xl text-success" />
                  <p className="font-bold text-xl">
                    Identidade validada com sucesso!
                  </p>
                </motion.div>
              )}

              {(success === null || success === false) && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-10"
                >
                  <div className="h-64 flex gap-2">
                    <div className="p-2 rounded-xl w-1/2">
                      <h3 className="font-bold">Selfie</h3>
                      <div className="p-2 bg-content1 rounded-xl h-full flex flex-col items-center justify-center gap-4">
                        {!selfieFile && !loading && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center gap-4"
                          >
                            <RiFileUserLine className="text-8xl" />
                            <Input
                              type="file"
                              onChange={(event) =>
                                handleFileChange(event, "selfie")
                              }
                            />
                          </motion.div>
                        )}

                        {selfieFile && !loading && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="p-2 bg-content1 rounded-xl h-full flex flex-col items-center justify-center gap-4"
                          >
                            <Image
                              src={URL.createObjectURL(selfieFile)}
                              className="w-32 h-32 rounded-xl object-cover"
                            />
                            <p className="text-sm">{selfieFile.name}</p>
                            <Button
                              onPress={() => handleRemoveFile("selfie")}
                              color="danger"
                            >
                              <FaRegTrashAlt />
                              Remover
                            </Button>
                          </motion.div>
                        )}

                        {loading && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Skeleton className="w-full h-full flex flex-col items-center justify-center gap-4 rounded-xl">
                              <div className="w-32 h-32"></div>
                            </Skeleton>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="p-2 rounded-xl w-1/2">
                      <h3 className="font-bold">CNH</h3>
                      <div className="p-2 bg-content1 rounded-xl h-full flex flex-col items-center justify-center gap-4">
                        {!cnhFile && !loading && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center gap-4"
                          >
                            <HiOutlineIdentification className="text-8xl" />
                            <Input
                              type="file"
                              onChange={(event) =>
                                handleFileChange(event, "cnh")
                              }
                            />
                          </motion.div>
                        )}

                        {cnhFile && !loading && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="p-2 bg-content1 rounded-xl h-full flex flex-col items-center justify-center gap-4"
                          >
                            <Image
                              src={URL.createObjectURL(cnhFile)}
                              className="w-32 h-32 rounded-xl object-cover"
                            />
                            <p className="text-sm">{cnhFile.name}</p>
                            <Button
                              onPress={() => handleRemoveFile("cnh")}
                              color="danger"
                            >
                              <FaRegTrashAlt />
                              Remover
                            </Button>
                          </motion.div>
                        )}

                        {loading && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Skeleton className="w-full h-full flex flex-col items-center justify-center gap-4 rounded-xl">
                              <div className="w-32 h-32"></div>
                            </Skeleton>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button isLoading={loading} type="submit" color="primary">
                    <FaCheck />
                    Validar
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default DocumentValidation;
