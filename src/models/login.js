import { login } from '@/services/login';

export default {
    namespace: 'login',

    state:{},

    effects:{
        *login({ payload }, { call, put }) {
            const response = yield call(login, payload);
            console.log('models',response)
        }
    },

    reducers:{

    }
}
