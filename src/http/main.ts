import $http from './base';
import config from '../config/main';

export class Http {
  constructor () {
    console.log('1111');
  }

  /**
   * 读取 URL
   */
  // private readonly URL: string = config.URL;
  private readonly AUTH_URL: string = config.AUTH_URL;
  private readonly ADMIN_URL: string = config.ADMIN_URL;

  /**
   * 延迟返回
   * @param promise Promise 请求方法
   * @param time 延迟的时间 毫秒
   */
  private delayRequest (promise: Promise<any>, time: number) {
    // 时间的回调函数
    const timeFunction =
      (t: number, callback: () => void) => { if (t > 0 && t < time) setTimeout(() => { callback(); }, (time - t)); };
    return new Promise<any>((resolve, reject) => {
      const dateTime = new Date().getTime(); // 请求开始的时间
      promise.then((res) => { timeFunction((new Date().getTime() - dateTime), () => { resolve(res); }); })
        .catch((e) => { timeFunction((new Date().getTime() - dateTime), () => { reject(e); }); });
    });
  }

  /**
   * 初始化 token
   * @param token 传入的 token
   */
  public initToken (token: HttpToken) {
    $http.interceptors.request.use((config) => {
      config.headers.Authorization = token;
      return config;
    }, (error) => { return error; });
  }

  /**
   * API 登录
   * @param data 传入的数据
   */
  public apiLogin (data: HttpLoginParam) {
    return this.delayRequest($http.post(this.ADMIN_URL + '/auth/token', data), 2000);
  }

  /**
   * API 登录
   * @param data 传入的数据
   */
  public apiLogout (data: HttpLogoutParam): Promise<HttpLogoutResult> {
    return $http.post(this.ADMIN_URL + '/auth/logout', data);
  }

  public apiUserQuery (data: HttpUserParam): Promise<HttpUserResult> {
    return $http.post(this.ADMIN_URL + '/user/query', data);
  }

  public apiUserCreate (data: HttpUserParam): Promise<HttpUserResult> {
    return $http.post(this.ADMIN_URL + '/user/create', data);
  }

  public apiUserUpdate (data: HttpUserParam): Promise<HttpUserResult> {
    return $http.post(this.ADMIN_URL + '/user/update', data);
  }

  public apiUserDelete (data: HttpUserParam): Promise<HttpUserResult> {
    return $http.post(this.ADMIN_URL + '/user/delete', data);
  }

  public apiUserRoleQuery (data: HttpUserRoleParam): Promise<HttpUserResult> {
    return $http.post(this.ADMIN_URL + '/user/role/query', data);
  }

  public apiJurisdictionInterfaceQuery (data: HttpJurisdictionInterfaceQuery) {
    return $http.post(this.ADMIN_URL + '/jurisdiction/interface/query', data);
  }

  public apiJurisdictionGroupQuery (data: any) {
    return $http.post(this.ADMIN_URL + '/jurisdiction/group/query', data);
  }
}

export default new Http();
