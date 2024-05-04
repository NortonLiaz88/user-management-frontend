/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { BaseResourceFormService } from '../base-resource-form-service';
import { UserEntity } from '../../models/user/user.entity';


export class UserManagementService extends BaseResourceFormService<UserEntity> {
  constructor() {
    super(
      `${import.meta.env.VITE_REACT_APP_API_URL}/users`,
      UserEntity.fromJson,
    );
  }

  handleError(err: any) {
    const fields = [];
    if (err instanceof AxiosError) {
      const code = err.response?.status;
      console.log('code', err.response);
      if (code === 422) {
        if (err?.response?.data?.errors) {
          for (const key of err?.response?.data?.errors ?? []) {
            fields.push({ field: key.field, message: key.message });
          }
        }
      }
      return {
        code: code,
        message: err.response?.data?.message,
        fields: fields,
      };
    }
    return err;
  }
  
}
