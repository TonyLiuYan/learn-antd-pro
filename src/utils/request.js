import axios from 'axios'
import { notification } from 'antd';
import router from 'umi/router';
let CancelToken = axios.CancelToken;
let pending = []
let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) {
      pending[p].f();
      pending.splice(p, 1);
    }
  }
}

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
  config => {
    removePending(config)
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    }
    config.validateStatus = validateStatus
    config.cancelToken = new CancelToken(function executor(c) {
      pending.push({ u: config.url + '&' + config.method, f: c });
    })
    console.log('请求拦截器设置的 config', config)
    return config;
  },
  error => {
    console.error('请求拦截器返回的 error', error)
    return Promise.reject(error);
  }
)

/**
 * 无论状态码是多少都会进此方法进行处理
 * `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
 * 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 
 * 否则，promise 将被 rejecte
 * @param status 状态码
 */
const validateStatus = (status) => {
  if (status === 200) {
    console.log('是200状态码检测')
    return true
  } else {
    console.log(`非200状态码检测：${status}`)
    // cancel()
    const errortext = codeMessage[status];
    notification.error({
      message: '请求错误',
      description: errortext,
    })

    if (status === 500) {
      // router.push('/')
      console.log('服务器发生错误，进行路由跳转')
    }
    return false
  }
}

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => {
  console.log(`响应拦截器返回的response:`, response)
  removePending(response.config);
  if (response.data && response.data.code === -1) {
    //根据正常返回200的信息  进行路由跳转
    router.push('/')
    return new Promise(() => { });
  }
  return response
}, error => {
  if (axios.isCancel(error)) {
    console.log('Request canceled');
    return new Promise(() => { });
  } else if (error.response && error.response.status) {
    console.log('响应拦截器返回的error', error)
    return new Promise(() => { });
  } else {
    notification.error({ message: '请检查网络连接' })
    return new Promise(() => { });
  }
})

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        console.log('post then', response)
        resolve(response.data)
      })
      .catch(error => {
        console.error('post catch', error)
        reject(error.data)
      })
  })
}

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      console.log('get then', response)
      resolve(response.data);
    }).catch(error => {
      console.error('get catch', error)
      reject(error.data)
    })
  });
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
  429: '请勿频繁请求数据',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

/**
 * 1.支持post请求
 * 2.支持get请求
 * 3.支持同一请求重复提交取消上一次请求
 * 4.发生异常或500等状态信息，不返回数据到上一层
 */