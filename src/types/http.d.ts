declare interface BaseParam {
  page?: number;
  size?: number;
}

declare interface HttpToken {
  token: string;
}

declare interface HttpLoginParam {
  account: string;
  password: string;
}

declare interface HttpUserParam extends BaseParam {
  id?: string;
  content?: string;
}

declare interface HttpUserRoleParam extends BaseParam {
  id?: string;
}

declare interface HttpLogoutParam {
  token: string;
}

declare interface HttpLoginDataResult {
  id: string;
  group: string;
  role: string;
  account: string;
  alias: string;
  name: string;
  avatar: string;
  sex: string;
  birthday: string;
  token: string;
  refreshToken: string;
  expiration: number;
  timeStamp: number;
}

declare interface HttpLogoutDataResult {

}

declare type HttpUserDataResult = TableUserDataSearch[];

declare interface HttpJurisdictionInterfaceQuery {

}

declare interface HttpResult<T> {
  data: T;
  code?: number;
  message: string;
}

declare type HttpLoginResult = HttpResult<HttpLoginDataResult>;
declare type HttpLogoutResult = HttpResult<HttpLogoutDataResult>;
declare type HttpUserResult = HttpResult<HttpUserDataResult>;
