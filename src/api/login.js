import {post} from '@/utils/request'

export const loginApi=(params)=>post('/api/login',params)
