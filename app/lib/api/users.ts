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
    skillSet: user.skillSet,
    createdAt: new Date(user.createdAt),
  }));

  return formattedData;
};

export const deleteUsers = async (userIds: number[]) => {
  // Delete users in parallel
  const deletePromises = userIds.map((id) => API.delete(`/users/${id}`));
  const responses = await Promise.all(deletePromises);

  return {
    success: true,
    deletedCount: responses.length,
  };
};
