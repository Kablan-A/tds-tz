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
  skillset: UserSkill[];
  createdAt: Date;
};
