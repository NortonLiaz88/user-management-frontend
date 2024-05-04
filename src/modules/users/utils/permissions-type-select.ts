import { UserPermission } from "../../../enums/user-permission";

export const permissionSelect = [
  {
    name: 'Administrador',
    value: UserPermission.Admin,
    id: UserPermission.Admin,
  },
  {
    name: 'Guest',
    value: UserPermission.Guest,
    id: UserPermission.Guest,
  },
];