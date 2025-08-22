import { IObjectLiteral } from "./ICommon";

export type UserRole =
  | "BOSS"
  | "HIGH_MANAGER"
  | "MANAGER"
  | "LEADER"
  | "SUPLEAD"
  | "STAFF"
  | "ASSISTANT"
  | "SUPER_ADMIN"
  | "ADMIN";

export type Team =
  | "HR"
  | "HC"
  | "SALES"
  | "SALES_ONLINE"
  | "CRM"
  | "TELESALES"
  | "CSKH"
  | "RISK"
  | "PAYMENT"
  | "SEO"
  | "SEO_ONLINE"
  | "IT_SEO";

export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCK";

export type SalaryStatus = "DRAFT" | "CONFIRMED" | "PAID";

export interface ITeam {
  _id: string;
  name: string;
  parentId?: null | ITeam;
  createdAt: string;
  updatedAt: string;
}

export type CreateTeamPayload = Pick<ITeam, "name"> & { parentId?: string };
export type UpdateTeamPayLoad = CreateTeamPayload & { teamId: string };

export interface IUser {
  _id: string;
  email: string;
  username: string;
  role: UserRole;
  team: string;
  teamId: ITeam;
  phone: string;
  fullname: string;
  status: UserStatus;
  salary: string | number;
  onboardAt: string;
  createdAt: string;
  updatedAt: string;
  birthday: string;
  officialAt: string;
  isOfficial: boolean;
  gender: string;
  social: IObjectLiteral;
  online: boolean;
  ip: string;
  userAgent: string;
  permissions?: Array<string>;
  avatar?: string;
}

export type CreateUserPayload = Pick<IUser, "email" | "role"> & {
  teamId: string;
};
export type UpdateUserPayLoad = CreateUserPayload &
  Partial<
    Pick<
      IUser,
      | "phone"
      | "fullname"
      | "username"
      | "onboardAt"
      | "birthday"
      | "officialAt"
    >
  >;

export interface IUserDetail {
  employee: IUser;
}

export type UpdateType = "fullname" | "username" | "phone" | "birthday"

export interface IChangeInformationMember {
  username?: string;
  phone?: string;
  fullname?: string;
  birthday?: string;
}
