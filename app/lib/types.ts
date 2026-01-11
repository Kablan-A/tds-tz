import type { Table } from "@tanstack/react-table";

export type NavItem = {
  title: string;
  url: string;
};

export type UserSkill = string;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  skillSet: UserSkill[];
  createdAt: Date;
};
