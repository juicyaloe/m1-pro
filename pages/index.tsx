import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { AccountData } from './api/accounts';

async function get_accounts() {
  let response = await fetch('/api/accounts');
  return response.json();
}

export default function Home() {
  const { data, isLoading } = useQuery<AccountData[]>(
    ['accounts'],
    get_accounts,
  );

  if (isLoading) return <div>로딩중</div>;

  return (
    <div>
      내 계좌 정보
      {data?.map(account => (
        <div key={account.currency}>
          <div>통화: {account.currency}</div>
          <div>잔고: {account.balance}</div>
        </div>
      ))}
    </div>
  );
}
