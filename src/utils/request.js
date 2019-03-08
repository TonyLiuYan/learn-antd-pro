import axios from 'axios'
import { notification } from 'antd';
import router from 'umi/router';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
//请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    }
    config.validateStatus = validateStatus
    // config.cancelToken=source.token
    console.log('interceptors.request config', config)
    return config;
  },
  error => {
    console.error('interceptors.request error', error)
    return Promise.reject(error);
  }
)

const validateStatus = (status) => {
  //无论状态码是多少 都会进来 返回false的时候，请求返回的是undefined
  console.log('validateStatus', status)
  if (status === 200) {
    return true
  } else {
    const errortext = codeMessage[status];
    notification.error({
      message: `请求错误`,
      description: errortext,
    })

    if (status === 500) {
      // router.push('/')
    }
    return false
  }
}



//响应拦截器
axios.interceptors.response.use(response => {
  console.log('interceptors.response', response)
  if (response.data && response.data.code === -1) {
    router.push('/')
  }
  return response
}, error => {
  //
  //404,500等时候会进来
  console.log('interceptors.response error', error.response)
  console.log('interceptors.response error status', error.response.status)
  if (error.response.status === 500) {
    source.cancel('登录失效')
    router.push('/')
    console.log('登录失效')

  }
  return Promise.resolve(error)
})





export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, { data: data, cancelToken: source.token })
      .then(response => {
        console.log('post then', response.data)
        resolve(response.data)
      })
      .catch(error => {
        console.error('post catch', error)
        reject(error)
      })
  })
}


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 1.post 和 get 的请求
 * 2.post方法中Promise的then处理和error处理以及catch处理
 *
 * 需要解决：
 * 请求返回状态码在非200的时候 弹出提示 并 做相应的路由跳转 并 取消请求的返回
 * 请求返回状态码在是200的时候，根据返回值code的相应对应规则，弹出提示 并 路由跳转，比如登录失效需要跳转到登录页面
 */
