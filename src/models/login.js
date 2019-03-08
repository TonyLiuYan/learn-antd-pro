export default {
    namespace: 'login',

    state:{},

    effects:{
        *login({ payload }, { call, put }) {
            console.log(payload)
        }
    },

    reducers:{

    }
}