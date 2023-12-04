import { ApiResponse } from "@/interface/axiosType";
import { LoginParams } from "@/interface/login";
import request from "@/utils/request";

export interface LoginReturnValue {
  token: string;
}

export const login = (
  data: LoginParams
): Promise<ApiResponse<LoginReturnValue>> => {
  return request.post({
    url: "/sys/login",
    data,
  });
};
