import { loginApi } from '@/api/login';

export async function login(params) {
  const res = await loginApi(params);
  console.log('services',res)
  return res
}
