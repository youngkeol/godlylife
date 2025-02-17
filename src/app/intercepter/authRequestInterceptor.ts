import { AxiosInstance, InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { useRouter } from "next/navigation";

const applyRequestInterceptor = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]; // 쿠키에서 토큰 추출

      // 기본 headers 설정
      const headers = new AxiosHeaders({
        "Content-Type": "application/json",
        ...config.headers, // 기존 헤더와 병합
      });

      // 토큰이 있을 경우 Authorization 헤더 추가
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // withCredentials 설정 (쿠키를 자동으로 전송)
      config.withCredentials = true;

      // config에 새로운 headers와 withCredentials 설정 적용
      config.headers = headers;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default applyRequestInterceptor;
