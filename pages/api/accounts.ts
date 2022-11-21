import type { NextApiRequest, NextApiResponse } from 'next';
import { accounts } from '../../lib/upbit';

type Error = {
  err?: any;
  message: string;
};

export type AccountData = {
  currency: string;
  balance: number;
  locked: number;
  avg_buy_price: number;
  avg_buy_price_modified: boolean;
  unit_currency: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountData[] | Error>,
) {
  if (req.method != 'GET') {
    res.status(404).json({ message: 'Not allowed method!' });
  }

  try {
    let get_accounts = await accounts();
    res.status(200).json(get_accounts as AccountData[]);
  } catch (err: any) {
    res.status(500).json({ err: err, message: 'Not expected error!' });
  }
}
