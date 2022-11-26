import styled from '@emotion/styled';
import { Fragment, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { AccountData } from './api/accounts';

import { Container } from '../components/ui';

const AccountContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const Currency = styled.div`
  border-radius: 5px;
  box-shadow: 3px 3px 5px #bebebe;

  margin: 10px 0px;
  padding: 5px 3px;
`;

const CaptionText = styled.span`
  font-size: 17px;
  font-weight: bold;
  margin-right: 5px;
`;

const NormalText = styled.span`
  font-size: 15px;
`;

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
    <AccountContainer>
      {data?.map(current => (
        <Currency
          key={current.currency}
          data-id={current.currency}
          onMouseEnter={e => console.log(e)}
          onMouseLeave={(e: any) => console.log(e.target.dataset.id)}
        >
          <CaptionText>{current.currency}: </CaptionText>
          <NormalText>
            {parseInt(current.balance)}{' '}
            {current.currency != 'KRW'
              ? `(원화 환산: ${
                  parseFloat(current.balance) *
                  parseFloat(current.avg_buy_price)
                }원)`
              : ''}
          </NormalText>
        </Currency>
      ))}
    </AccountContainer>
  );
}
