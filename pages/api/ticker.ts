import type { NextApiRequest, NextApiResponse } from 'next';
import { ticker } from '../../lib/upbit';
import * as R from 'ramda';

type Error = {
  err?: any;
  message: string;
};

export type TickerData = {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  change: string;
  change_price: number;
  change_rate: number;
  signed_change_price: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TickerData | Error>,
) {
  if (req.method != 'GET') {
    res.status(404).json({ message: 'Not allowed method!' });
  }

  try {
    let get_ticker: TickerData[] = await ticker(req.query?.ticker as string);
    res.status(200).json(get_ticker[0]);
  } catch (err: any) {
    res.status(500).json({ err: err, message: 'Not expected error!' });
  }
}
