const { v4: uuidv4 } = require('uuid');
const sign = require('jsonwebtoken').sign;

export default async function accounts() {
  const access_key: string = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string;
  const secret_key: string = process.env.NEXT_PUBLIC_SECERT_TOKEN as string;
  const server_url: string = 'https://api.upbit.com/v1/accounts';

  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
  };

  const token = sign(payload, secret_key);

  const option = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, accept: 'application/json' },
  };

  let response = await fetch(server_url, option);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let response_json = await response.json();
  return response_json;
}
