import { useEffect, useState } from 'react';
import SocketControl from '../lib/upbit/socket';

export default function Socket() {
  const [socket, set_socket] = useState<SocketControl | null>(null);

  useEffect(() => {
    const message_callback = (event: MessageEvent<any>) => {
      var enc = new TextDecoder('utf-8');
      var arr = new Uint8Array(event.data);
      console.log(enc.decode(arr));
    };

    const _socket = new SocketControl().setting(message_callback);
    set_socket(_socket);
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          socket!.send('PING');
        }}
      >
        test
      </button>
      <button
        onClick={() => {
          socket?.request('orderbook', ['KRW-BTC'], true);
        }}
      >
        test2
      </button>
      <button></button>
    </div>
  );
}
