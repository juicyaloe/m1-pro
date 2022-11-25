const { v4: uuidv4 } = require('uuid');

type Type = 'ticker' | 'trade' | 'orderbook';
type Code = 'KRW-BTC' | 'KRW-DOGE';

function socket_request(
  socket: WebSocket | null,
  type: Type,
  codes: Code[],
  isOnlySnapshot: boolean = false,
  simple: boolean = false,
) {
  const message = [
    {
      ticket: uuidv4(),
    },
    {
      type: type,
      codes: codes,
      isOnlySnapshot: isOnlySnapshot,
    },
    {
      format: simple ? 'SIMPLE' : 'DEFAULT',
    },
  ];

  socket?.send(JSON.stringify(message));
}

export { type Type, type Code, socket_request };
