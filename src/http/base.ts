/**
 * 导入网络请求的包
 */
import _http from 'axios';

/**
 * 设置超时的时间
 */
_http.defaults.timeout = 10000;

/**
 * 设置请求的头部
 */
_http.defaults.headers = {
  'Content-Type': 'application/json;'
};

/**
 * 设置请求的头部
 */
_http.interceptors.request.use((config) => {
  // config.headers['Authorization'] = 'Basic wo shi Authorization';
  // config.headers.Authorization = token;
  return config;
}, (error) => {
  return error;
});

/**
 * 设置返回的头部
 */
_http.interceptors.response.use((response) => {
  // 对响应数据做点什么
  if (response.data !== undefined) return response.data;
  return response;
}, function (error) {
  if (error.response !== undefined && error.response.data !== undefined) {
    return error.response.data;
  } else {
    return Promise.reject(error);
  }
  // 对响应错误做点什么
  // return Promise.reject(error);
});

export default _http;
