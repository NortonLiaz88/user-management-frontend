import { AxiosError } from "axios";
import { IUserApiResponse } from "../../models/user/user.model";
import api from "../api";

export const fetchUserData = async (): Promise<IUserApiResponse> => {
  try {
    const { data } = await api.get<IUserApiResponse>(`/me/profile`);
    return data;
  } catch (err) {
    throw throwHttpError(err);
  }
};

export const updateUserProfile = async (
  form: FormData
): Promise<IUserApiResponse> => {
  try {
    const { data } = await api.put<IUserApiResponse>(`/me`, form);
    return data;
  } catch (err) {
    throw throwHttpError(err)
  }
};

function throwHttpError(err: unknown) {
  const fields = [];
  if (err instanceof AxiosError) {
    const code = err.response?.status;
    if (code === 422) {
      if (err?.response?.data?.errors) {
        for (const key of err?.response?.data?.errors ?? []) {
          fields.push({ field: key.field, message: key.message });
        }
      }
    }
    return {
      code: code,
      message: code,
      fields: fields,
    };
  }
  return err;
}
