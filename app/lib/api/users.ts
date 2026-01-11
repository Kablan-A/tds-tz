import type { User } from "../types";
import { API } from "~/lib/api";

type fetchAllUsersParams = {
  limit: number;
  skip: number;
};

export const fetchAllUsers = async ({
  limit = 30,
  skip = 0,
}: fetchAllUsersParams) => {
  const response = await API.get(`/users?limit=${limit}&skip=${skip}`);

  const users = response.data.users || response.data;

  const formattedData: User[] = users.map((user: any) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    skillset: user.skillset || (user.university ? [user.university] : []),
    createdAt: new Date(user.birthDate || new Date()),
  }));

  return formattedData;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await API.get(`/users/${id}`);
  const user = response.data;

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    skillset: user.skillset || (user.university ? [user.university] : []),
    createdAt: new Date(user.birthDate || new Date()),
  };
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
  const response = await API.post("/users/add", {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  });

  return {
    id: response.data.id,
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    email: response.data.email,
    skillset: userData.skillset,
    createdAt: new Date(),
  };
};

export const updateUser = async (
  id: number,
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    skillset: string[];
  },
) => {
  const response = await API.put(`/users/${id}`, {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  });

  return {
    id: response.data.id,
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    email: response.data.email,
    skillset: userData.skillset,
    createdAt: new Date(response.data.birthDate || new Date()),
  };
};
