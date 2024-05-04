import { UserPermission } from "../../enums/user-permission";
import { UserStatus } from "../../enums/user-status";
import { BaseResourceFormModel } from "../base-resource-form";
import { IUserApiResponse } from "./user.model";

export type UserProps = {
    id?: number;
    email: string;
    username: string;
    name: string;
    lastName: string;
    permission: UserPermission;
    status: UserStatus;
    password?: string;
}

export class UserEntity extends BaseResourceFormModel {
    constructor(public props?: UserProps) {
        super();
    }

    static fromJson(json: IUserApiResponse): UserEntity {
        return new UserEntity({
            id: json.id,
            email: json.email,
            username: json.username,
            name: json.name,
            lastName: json.lastName,
            permission: json.permission,
            status: json.status,
        });
    }

    toJson() {
        return {
            id: this.props?.id,
            email: this.props?.email,
            username: this.props?.username,
            name: this.props?.name,
            lastName: this.props?.lastName,
            permission: this.props?.permission,
            status: this.props?.status,
        };
    }
}