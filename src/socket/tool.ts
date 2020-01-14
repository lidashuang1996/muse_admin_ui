import { Message, BaseSocket } from './base';
import config from '../config/main';

export default class ToolSocket {
  private static _instance: (ToolSocket | null) = null;
  private static onCallback: (((data: string) => any) | null) = null;
  private conn: (BaseSocket | null) = null;
  private readonly URL: string = config.TOOL_SOCKET_URL;

  public static init (fun: ((data: string) => any)) {
    this.onCallback = fun;
    this._instance = new ToolSocket();
  }

  public static getInstance (fun?: ((data: string) => any)): ToolSocket {
    if (this._instance == null && fun != null) this.init(fun);
    return this._instance!;
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor () {}

  private connect (param: ({ [key: string]: string })) {
    this.conn = new BaseSocket(this.URL, param, this.onOpen, this.onMessage, this.onClose);
  }

  public connectAdmin () {
    this.connect({ ROLE: 'ADMIN' });
  }

  public connectUser () {
    this.connect({ ROLE: 'USER' });
  }

  public onOpen (ev: Event) {
    // console.log('onOpen: ', ev);
  }

  public onMessage (ev: Message) {
    // console.log('onMessage: ', ev);
    if (ToolSocket.onCallback != null) ToolSocket.onCallback(ev.data);
  }

  public onClose (ev: Event) {
    // console.log('onClose: ', ev);
  }

  public sendMessage (message: string) {
    // console.log('sendMessage:', message);
    if (this.conn != null) this.conn.getSocket().send(message);
  }
}
