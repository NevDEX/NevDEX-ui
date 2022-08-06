import axios from 'axios'
const BaseUrl = "https://testnet.nevdex.tech/api/"
// const BaseUrl = 'http://127.0.0.1:5000/api/'

// create an axios instance
const service = axios.create({
  baseURL: BaseUrl, // url = base url + request url
  //timeout: 5000 // request timeout
  timeout: 500000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // console.log("http return ", res)
    if (res.code !== 20000) {
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  (error) => {
    console.error('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
