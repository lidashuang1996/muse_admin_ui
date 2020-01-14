// 导入 vuex 里面的 types
import types from '../store/types';
import Crypto from '../utils/crypto';
/**
 * 缓存数据的类
 */
export class Cache {
  private static self: any; // 缓存 Vue 对象,用来修改 Vuex 里面的数据
  private static USER_NAME: string = 'WMS_USER';
  private static LOCK_SCREEN_NAME: string = 'WMS_LOCK_SCREEN';

  // 初始化数据
  public static init (self?: any) {
    let bool = false;
    const user = window.localStorage.getItem(this.USER_NAME);
    if (user !== undefined && user !== null) bool = true;
    if (self !== undefined && self != null) this.self = self;
    if (this.self !== undefined && this.self != null) {
      if (bool) {
        this.self.$store.commit(types.LOGIN_CHANGE, JSON.parse(user!));
        this.self.$store.commit(types.STATUS_CHANGE, 1);
        if (this.isLockScreen()) this.self.$store.commit(types.STATUS_CHANGE, 2);
      } else {
        this.self.$store.commit(types.LOGIN_CHANGE, {});
        this.self.$store.commit(types.STATUS_CHANGE, 0);
      }
    }
    return this;
  }

  // 设置用户信息
  public static setUser (value: HttpLoginDataResult) {
    window.localStorage.setItem(this.USER_NAME, JSON.stringify(value));
    return this;
  }

  // 删除用户信息
  public static delUser () {
    window.localStorage.removeItem(this.USER_NAME);
    return this;
  }

  private static isLockScreen (): boolean {
    const cachePwd = window.localStorage.getItem(this.LOCK_SCREEN_NAME);
    return cachePwd !== undefined && cachePwd != null;
  }

  public static setLockScreen (pwd: string) {
    window.localStorage.setItem(this.LOCK_SCREEN_NAME, Crypto.md5(pwd));
    return this;
  }

  public static checkLockScreen (pwd: string): boolean {
    const cachePwd = window.localStorage.getItem(this.LOCK_SCREEN_NAME);
    if (cachePwd !== undefined && cachePwd != null && Crypto.md5(pwd) === cachePwd) {
      this.delLockScreen();
      this.init();
      return true;
    } else return false;
  }

  public static delLockScreen () {
    window.localStorage.removeItem(this.LOCK_SCREEN_NAME);
    return this;
  }

  public static logout () {
    this.delUser();
    this.delLockScreen();
    return this;
  }

  public static clear () {
    window.localStorage.clear();
    return this;
  }
}

export default Cache;
