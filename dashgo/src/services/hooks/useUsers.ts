import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const response = await api.get("/users", { params: { page } });

  const totalCount = Number(response.headers["x-total-count"]);

  const users = response.data.users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
  }));

  return { users, totalCount };
}

export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page));
}
