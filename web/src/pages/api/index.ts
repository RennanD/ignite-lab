import httpProxyMiddleware from 'next-http-proxy-middleware';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { accessToken } = await getAccessToken(request, response);
  return httpProxyMiddleware(request, response, {
    target: 'http://localhost:2000/graphql',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
