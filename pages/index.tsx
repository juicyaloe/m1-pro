import styled from '@emotion/styled';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { AccountData } from './api/accounts';
import type { TickerData } from './api/ticker';

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
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

async function get_ticker(market: string | null) {
  let response = await fetch(`/api/ticker?ticker=KRW-${market ?? ''}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export default function Home() {
  const [hover, setHover] = useState<string | null>(null);
  const money = useMemo(() => 'KRW', []);

  const { data: accounts, isLoading: accounts_loading } = useQuery<
    AccountData[]
  >(['accounts'], get_accounts);
  const {
    data: ticker,
    isLoading: ticker_loading,
    isSuccess: ticker_success,
  } = useQuery<TickerData>(['ticker', hover], () => get_ticker(hover));

  if (accounts_loading)
    return <Container>로딩중입니다.. 조금만 기다려주세요</Container>;

  return (
    <AccountContainer>
      {accounts?.map(current => (
        <Currency
          key={current.currency}
          data-id={current.currency}
          onMouseEnter={(e: any) => {
            if (e.target.dataset.id == money) return;
            setHover(e.target.dataset.id);
          }}
        >
          <div>
            <CaptionText>{current.currency}: </CaptionText>
            <NormalText>
              {current.currency != money
                ? current.balance + '개'
                : parseInt(current.balance) + '원'}
            </NormalText>
          </div>
          {hover == current.currency && hover != money && (
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
              <ExplainText>
                구입 당시 가치:{' '}
                {(
                  parseFloat(current.balance) *
                  parseFloat(current.avg_buy_price)
                ).toFixed()}{' '}
                {current.unit_currency}
              </ExplainText>
              <ExplainText>
                현재 가격:{' '}
                {ticker_success
                  ? `${ticker.trade_price} ${current.unit_currency}`
                  : `0 ${current.unit_currency}`}
              </ExplainText>
              <ExplainText>
                현재 가치:{' '}
                {ticker_success
                  ? `${(
                      parseFloat(current.balance) * ticker.trade_price
                    ).toFixed()} ${current.unit_currency}`
                  : `0 ${current.unit_currency}`}
              </ExplainText>
            </div>
          )}
        </Currency>
      ))}
    </AccountContainer>
  );
}
