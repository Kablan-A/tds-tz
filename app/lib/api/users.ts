import type { User } from "../types";
import { API } from "~/lib/api";

type fetchAllUsersParams = {
  limit: number;
  skip: number;
};

export const fetchAllUsers = async ({
  limit = 0,
  skip = 0,
}: fetchAllUsersParams) => {
  const response = await API.get(`/users?limit=${limit}&skip=${skip}`);
  const data = response.data;

  const formattedData: User[] = data.map((user: any) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    skillset: user.skillset,
    createdAt: new Date(user.createdAt),
  }));

  return formattedData;
};

export const deleteUsers = async (userIds: number[]) => {
  const deletePromises = userIds.map((id) => API.delete(`/users/${id}`));
  const responses = await Promise.all(deletePromises);

  return {
    success: true,
    deletedCount: responses.length,
  };
};

export const createUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  skillset: string[];
}) => {
  const response = await API.post("/users/add", userData);

  return {
    id: response.data.id,
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    email: response.data.email,
    skillset: response.data.skillset,
    createdAt: new Date(response.data.createdAt || new Date()),
  };
};
