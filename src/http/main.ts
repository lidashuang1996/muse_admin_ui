import base from './base';
import config from '../config/main';

export class Http {
  /**
   * 读取 URL
   */
  private readonly URL: string = config.URL;

  private readonly $http: any = base;

  /**
   * 延迟返回
   * @param promise Promise 请求方法
   * @param time 延迟的时间 毫秒
   */
  private delayRequest<T> (promise: Promise<T>, time: number): Promise<T> {
    // 时间的回调函数
    const timeFunction = (t: number, callback: () => void) => {
      if (t > 0 && t < time) setTimeout(() => { callback(); }, (time - t));
      else callback();
    };
    return new Promise<T>((resolve: any, reject: any) => {
      const dateTime = new Date().getTime(); // 请求开始的时间
      promise
        .then((res: T) => {
          timeFunction((new Date().getTime() - dateTime), () => { resolve(res); });
        })
        .catch((e: any) => {
          timeFunction((new Date().getTime() - dateTime), () => { reject(e); });
        });
    });
  }

  /**
   * 初始化 token
   * @param token 传入的 token
   */
  public initToken (token: HttpToken) {
    this.$http.interceptors.request.use((config) => {
      config.headers.Authorization = token;
      return config;
    }, (error: any) => { return error; });
  }

  /**
   * API 帐号密码登录操作
   * @param data 传入的数据
   */
  public apiLogin (data: HttpLoginParam): Promise<HttpLoginResult> {
    return this.delayRequest<HttpLoginResult>(this.$http.get(this.URL + '/auth.token.json'), 3000);
  }

  /**
   * API 所有登录的登出操作（退出登录）
   * @param data 传入的数据
   */
  public apiLogout (data: HttpLogoutParam): Promise<HttpLogoutResult> {
    return this.$http.post(this.URL + '/auth/logout', data);
  }

  public apiUserQuery (data: HttpUserParam): Promise<HttpUserResult> {
    return this.$http.post(this.URL + '/user/query', data);
  }

  public apiUserCreate (data: HttpUserParam): Promise<HttpUserResult> {
    return this.$http.post(this.URL + '/user/create', data);
  }

  public apiUserUpdate (data: HttpUserParam): Promise<HttpUserResult> {
    return this.$http.post(this.URL + '/user/update', data);
  }

  public apiUserDelete (data: HttpUserParam): Promise<HttpUserResult> {
    return this.$http.post(this.URL + '/user/delete', data);
  }

  public apiUserRoleQuery (data: HttpUserRoleParam): Promise<HttpUserResult> {
    return this.$http.post(this.URL + '/user/role/query', data);
  }

  public apiJurisdictionInterfaceQuery (data: HttpJurisdictionInterfaceQuery) {
    return this.$http.post(this.URL + '/jurisdiction/interface/query', data);
  }

  public apiJurisdictionGroupQuery (data: any) {
    return this.$http.post(this.URL + '/jurisdiction/group/query', data);
  }
}

export default new Http();
