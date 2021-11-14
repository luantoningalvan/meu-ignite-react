import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../../components/Form/Input";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useMutation } from "react-query";
import { api } from "../../../services/api";
import { queryClient } from "../../../services/queryClient";
import { useRouter } from "next/dist/client/router";

type CreateUserData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "A senha precisa no mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserData) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(createUserSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserData> = async (data) => {
    await createUser.mutateAsync(data);

    router.push("/users");
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["4", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["4", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["4", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                {...register("name")}
                error={formState.errors.name}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                {...register("email")}
                error={formState.errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["4", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register("password")}
                error={formState.errors.password}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                {...register("password_confirmation")}
                error={formState.errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end" gridGap="4">
            <Link href="/users" passHref>
              <Button colorScheme="whiteAlpha">Cancelar</Button>
            </Link>
            <Button
              colorScheme="pink"
              type="submit"
              isLoading={formState.isSubmitting}
            >
              Salvar
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
