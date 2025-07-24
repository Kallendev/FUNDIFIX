declare module '@/api/jobs' {
  export function registerUser(userData: any): Promise<any>;
  export function loginUser(userData: any): Promise<any>;
}
