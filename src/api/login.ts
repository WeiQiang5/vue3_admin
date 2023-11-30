import { LoginParams } from "@/interface/login";
import request from "@/utils/request";

export const login = (data: LoginParams) => {
  return request.post({
    url: "/sys/login",
    data,
  });
};
