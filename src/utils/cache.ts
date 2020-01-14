
export class Cache {
  private static self: any;
  private static USER_KEY: string = 'WMS_USER';
  private static LOCK_SCREEN: string = 'WMS_LOCK_SCREEN';

  public static init (self?: any) {
    let bool = false;
    const user = localStorage.getItem(this.USER_KEY);
    if (user !== undefined && user !== null) { bool = true; }
    if (self !== undefined) { this.self = self; }
    if (this.self !== undefined) {
      if (bool) {
        this.self.$store.state.status = 1;
        this.self.$store.state.login = JSON.parse(user!);
      } else {
        this.self.$store.state.status = 0;
        this.self.$store.state.login = {};
      }
    }
    return this;
  }

  public static setUser (value: HttpLoginDataResult) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(value));
    return this;
  }

  public static delUser () {
    localStorage.removeItem(this.USER_KEY);
    return this;
  }

  public static setLockScreen (value: LockScreen) {
    localStorage.setItem(this.LOCK_SCREEN, JSON.stringify(value));
    return this;
  }

  public static checkLockScreen (value: LockScreen): boolean {
    const pwd = localStorage.getItem(this.LOCK_SCREEN);
    if (pwd != null && pwd === JSON.stringify(value)) {
      this.delLockScreen();
      return true;
    } else return false;
  }

  public static delLockScreen () {
    localStorage.removeItem(this.LOCK_SCREEN);
    return this;
  }

  public static clear () {
    localStorage.clear();
    return this;
  }
}

export default Cache;
