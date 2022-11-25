import { Fragment, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { AccountData } from './api/accounts';

import { Container } from '../components/ui';

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
    <Container>
      {data?.map(current => (
        <div key={current.currency}>
          <span>통화: {current.currency}/ </span>
          <span>잔고: {parseFloat(current.balance)}</span>
        </div>
      ))}
    </Container>
  );
}
