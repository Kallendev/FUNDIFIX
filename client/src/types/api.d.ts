// src/types/custom-modules.d.ts

declare module '@/api/jobs' {
  export function registerUser(userData: any): Promise<any>;
  export function loginUser(userData: any): Promise<any>;
}

declare module '@/api/axios' {
  import axios from 'axios';
  export default axios;
}
