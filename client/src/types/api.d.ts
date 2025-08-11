// src/types/custom-modules.d.ts

declare module '@/api/jobs' {
  // Define a type for job data if you want better autocomplete
  export interface JobData {
    title: string;
    description: string;
    category: string;
    budget: number | string;
    location: string;
  }

  export function getAllJobs(): Promise<any>;
  export function createJob(jobData: JobData): Promise<any>;
  export function registerUser(userData: any): Promise<any>;
  export function loginUser(userData: any): Promise<any>;
}

declare module '@/api/user' {
  export function updateUserProfile(payload: any): Promise<any>;
  // add more exports if your user API has other functions
}

declare module '@/api/axios' {
  import axios from 'axios';
  export default axios;
}
