import { UserPermission } from "../../enums/user-permission";
import { UserStatus } from "../../enums/user-status";

export interface IUserApiResponse {
  id?: number;
  email: string;
  username: string;
  name: string;
  lastName: string;
  permission: UserPermission;
  status: UserStatus;
  isEditable?: boolean;
  isRemovable?: boolean;
}

export interface ICreateUser {
  name: string;
  lastName: string;
  email: string;
  username: string;
  permission: UserPermission;
  status: UserStatus;
  password?: string;
}

export interface IUpdateUser {
    name: string;
    lastName: string;
    email: string;
    username: string;
    oldPassword?: string;
    newPassword?: string;
}