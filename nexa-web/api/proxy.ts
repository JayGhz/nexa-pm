import httpProxy from 'http-proxy';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  return new Promise<void>((resolve, reject) => {
    const target = process.env.AWS_API_URL || 'http://localhost:8080';

    proxy.web(req, res, {
      target,
      changeOrigin: true,
    }, (err) => {
      if (err) {
        console.error('Proxy Error:', err);
        res.status(500).json({ error: 'Proxy error', details: err.message });
        return reject(err);
      }
      resolve();
    });
  });
}
