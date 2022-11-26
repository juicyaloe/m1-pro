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

  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const CaptionText = styled.span`
  font-size: 17px;
  font-weight: bold;
  margin-right: 5px;
`;

const NormalText = styled.span`
  font-size: 15px;
`;

const ExplainText = styled.div`
  font-size: 13px;
  padding: 3px 0;
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

  const [hover, setHover] = useState<string>('');

  if (isLoading) return <div>로딩중</div>;

  return (
    <AccountContainer>
      {data?.map(current => (
        <Currency
          key={current.currency}
          data-id={current.currency}
          onMouseEnter={(e: any) => setHover(e.target.dataset.id)}
        >
          <div>
            <CaptionText>{current.currency}: </CaptionText>
            <NormalText>{parseInt(current.balance)}</NormalText>
          </div>
          {hover == current.currency && (
            <div>
              <ExplainText>
                보유 중인 수량: {current.balance} {current.currency}
              </ExplainText>
              <ExplainText>
                주문 중인 수량: {current.locked} {current.currency}
              </ExplainText>
              <ExplainText>
                매수 평균가: {current.avg_buy_price} {current.unit_currency}
              </ExplainText>
            </div>
          )}
        </Currency>
      ))}
    </AccountContainer>
  );
}
