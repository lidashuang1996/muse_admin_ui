export interface Message extends Event{
  data: string;
}
export class BaseSocket {
  private readonly ws: WebSocket;
  constructor (url: string, param: ({ [key: string]: string }), onOpen: ((ev: Event) => any), onMessage: ((ev: Message) => any), onClose: ((ev: Event) => any)) {
    let p = '';
    for (let key in param) p += `&${key}=${param[key]}`;
    if (p.length > 1) p = `?${p.substring(1)}`;
    this.ws = new WebSocket(url + p);
    this.ws.onopen = (ev) => { onOpen(ev); };
    this.ws.onmessage = (ev) => { onMessage(ev); };
    this.ws.onclose = (ev) => { onClose(ev); };
  }
  public getSocket (): WebSocket {
    return this.ws;
  }
}
