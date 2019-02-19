import * as request from 'request';

// @ts-ignore
declare module 'tor-request' {
  export function request(
    url: string,
    options?: request.CoreOptions,
    cb?: request.RequestCallback
  ): void;

  export function setTorAddress(ipaddress: string, port: number): void;

  interface ITorControlPort {
    password: string;
    host: string;
    port: number;
    send: (commands: string[], done: (err: Error, data: any) => void) => void;
  }

  export const TorControlPort: ITorControlPort;

  export function newTorSession(done: (err: Error) => void): void;
}
