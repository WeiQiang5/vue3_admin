import { HttpStatus } from "@/interface/statusCode";
import { ApiResponse, httpRequestConfig } from "@/interface/axiosType";
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import qs from "qs";
import useUserStore from "@/store/modules/user";

export class Request {
  // axios实例
  instance: AxiosInstance;
  // 基础配置
  private baseConfig: httpRequestConfig = {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      // "Content-Type": "application/json; charset=UTF-8",
      icode: "E1B29D5AD691523C",
    },
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 5000,
  };
  constructor(options: httpRequestConfig) {
    // 使用axios创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, options));
    this.instance.interceptors.request.use(
      (options: httpRequestConfig) => {
        const headers = (options.headers = options.headers || {});
        const store = useUserStore();
        console.log("拦截器==>", store.token);

        if (store.token) {
          headers.Authorization = `Bearer ${store.token}`;
        }
        if (options.form) {
          headers["Content-Type"] =
            "application/x-www-form-urlencoded; charset=UTF-8";
          delete options.form;
        }
        if (options.formUpload) {
          headers["Content-Type"] = "multipart/form-data; charset=UTF-8";
          delete options.formUpload;
        }
        // 检验post数据格式
        const contentType = headers["Content-Type"];
        if (
          typeof options.data === "object" &&
          contentType &&
          String(contentType).indexOf("application/x-www-form-urlencoded")
        ) {
          options.data = qs.stringify(options.data);
        }

        return options;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        if (error.response) {
          const { data, status } = error.response;
          let errMessage =
            (data as unknown as ApiResponse<string>).message ||
            "服务忙，请稍后重试";
          switch (status) {
            case HttpStatus.BAD_REQUEST:
              errMessage = "请求错误(400)";
              break;
            case HttpStatus.UNAUTHORIZED:
              errMessage = "未授权,请重新登录(401)";
              break;
            case HttpStatus.FORBIDDEN:
              errMessage = "拒绝访问(403)";
              break;
            case HttpStatus.NOT_FOUND:
              errMessage = "404 Not Found";
              break;
            case HttpStatus.REQUEST_TIMEOUT:
              errMessage = "请求超时(408)";
              break;
            case HttpStatus.INTERNAL_SERVER_ERROR:
              errMessage = "服务器错误(500)";
              break;
            case HttpStatus.NOT_IMPLEMENTED:
              errMessage = "服务未实现(501)";
              break;
            case HttpStatus.BAD_GATEWAY:
              errMessage = "网络错误(502)";
              break;
            case HttpStatus.SERVICE_UNAVAILABLE:
              errMessage = "服务不可用(503)";
              break;
            case HttpStatus.GATEWAY_TIMEOUT:
              errMessage = "网络超时(504)";
              break;
            case HttpStatus.HTTP_VERSION_NOT_SUPPORTED:
              errMessage = "HTTP版本不受支持(505)";
              break;
            default:
              errMessage = `连接出错(${error.response.status})!`;
          }
          // 弹出提示框
          console.log(`${errMessage},请检查网络或联系管理员`);
        } else {
          console.error(
            (error.config && error.config.url) || "无url",
            "请求接口超过一分钟无响应"
          );
          // const msg = userCommonStoreHook().networkState
          //   ? '您与服务器的连接已经断开，请联系管理员处理'
          //   : '网络连接已断开'
          // 弹出提示框
          console.log("您与服务器的连接已经断开，请联系管理员处理");
        }
        return Promise.reject(error);
      }
    );
  }
  request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }
  get<T = unknown>(config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.get(config?.url as string, config);
  }
  public post<T = unknown>(
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.post(config?.url as string, config?.data, config);
  }

  public put<T = unknown>(
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.put(config?.url as string, config?.data, config);
  }
  public delete<T = unknown>(
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.delete(config?.url as string, config);
  }
}

export default new Request({});
