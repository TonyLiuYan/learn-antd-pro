import { loginApi,getApi } from '@/api/login';

export async function login(params) {
  const res = await loginApi(params);
  console.log('services',res)
  return res
}

export async function get() {
  const res = await getApi();
  console.log('services',res)
  return res
}
