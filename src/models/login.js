import { login,get } from '@/services/login';

export default {
    namespace: 'login',

    state:{},

    effects:{
        *login({ payload }, { call, put }) {
            const response = yield call(login, payload);
            console.log('models',response)
        },
        *get({ payload }, { call, put }) {
          const response = yield call(get,payload);
          console.log('models',response)
      }
    },

    reducers:{

    }
}
