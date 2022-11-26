import { useQuery } from '@tanstack/react-query';

async function get_ticker(market: string) {
  let response = await fetch(`/api/ticker?ticker=${market}`);

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export default function Ticker() {
  const { data, isLoading, isError } = useQuery(['ticker'], () =>
    get_ticker('KRW-BTC'),
  );

  if (isLoading) return <div>로딩중</div>;

  if (isError) return <div>에러</div>;

  return <div>asd</div>;
}
