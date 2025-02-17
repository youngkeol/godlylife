import axios from 'axios';
import applyRequestInterceptor from './authRequestInterceptor';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER,
  timeout: 5000,
});

// 인터셉터 적용
applyRequestInterceptor(axiosInstance);

export default axiosInstance;