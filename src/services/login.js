import request from '@/utils/request';

export async function login(params) {
    return request.post('/api/logins', params);
}