import {post,get} from '@/utils/request'

export const loginApi=(params)=>post('/api/login',params)
export const getApi=()=>get('/api/gettest')
