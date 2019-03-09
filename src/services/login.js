import { loginApi,getApi } from '@/api/login';

export async function login(params) {
  const res = await loginApi(params)
  return res
}

export async function get(params) {
  const res = await getApi(params);
  console.log('services',res)
  return res
}
