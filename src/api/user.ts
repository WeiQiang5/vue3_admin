import { ApiResponse } from "@/interface/axiosType";
import { LoginParams } from "@/interface/login";
import request from "@/utils/request";

export interface LoginReturnValue {
  token: string;
}

// 登录
export const login = (
  data: LoginParams
): Promise<ApiResponse<LoginReturnValue>> => {
  return request.post({
    url: "/sys/login",
    data,
  });
};

interface Role {
  id: string;
  title: string;
}
export interface UserInfo {
  role?: Role[];
  _id?: string;
  id?: string;
  username?: string;
  titles?: string;
  avatar?: string;
  permission?: Record<string, string[]>;
}

export const getProfile = (): Promise<ApiResponse<UserInfo>> => {
  return request.get({
    url: "/sys/profile",
  });
};
