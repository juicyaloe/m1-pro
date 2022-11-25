import { create_socket, socket_setting } from './initializer';

import type { Type, Code } from './control';
import { socket_request } from './control';

class SocketControl {
  constructor(private socket: WebSocket | null = null) {}

  setting(callback?: (event: MessageEvent<any>) => any): this | null {
    this.socket ? null : (this.socket = create_socket());
    return socket_setting(this.socket, callback) ? this : null;
  }

  request(
    type: Type,
    codes: Code[],
    isOnlySnapshot: boolean = false,
    simple: boolean = false,
  ) {
    socket_request(this.socket, type, codes, isOnlySnapshot, simple);
  }

  send(message: string) {
    this.socket?.send(message);
  }
}

export { SocketControl as default, create_socket };
