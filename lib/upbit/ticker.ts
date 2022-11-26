export default async function ticker(market: string) {
  const server_url: string = `https://api.upbit.com/v1/ticker?markets=${market}`;

  const option = {
    method: 'GET',
    headers: { accept: 'application/json' },
  };

  let response = await fetch(server_url, option);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let response_json = await response.json();
  return response_json;
}
