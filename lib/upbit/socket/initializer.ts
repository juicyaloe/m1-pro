function create_socket(): WebSocket {
  return new WebSocket('wss://api.upbit.com/websocket/v1');
}

function socket_setting(
  socket: WebSocket | null,
  callback?: (event: MessageEvent<any>) => any,
): boolean {
  if (!socket) {
    return false;
  }

  socket.onopen = () => console.log('socket opened');
  socket.onclose = () => console.log('socket closed');

  socket.onerror = (event: any) => console.log('socket error: ' + event.data);

  socket.binaryType = 'arraybuffer';
  callback ? (socket.onmessage = callback) : null;

  return true;
}

export { create_socket, socket_setting };
