import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.url === '/favicon.ico') return res.status(404).end();

  const baseUrl = process.env.AWS_API_URL;

  if (!baseUrl) {
    return res.status(500).json({ error: 'Falta la variable AWS_API_URL en Vercel' });
  }

  const targetUrl = `${baseUrl}${req.url}`;

  try {
    const options: RequestInit = {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
    };

    if (req.headers.authorization) {
      (options.headers as any).Authorization = req.headers.authorization;
    }

    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);

    const text = await response.text();

    res.status(response.status);

    try {
      res.json(JSON.parse(text));
    } catch {
      res.send(text);
    }
  } catch (error: any) {
    console.error('Proxy Fetch Error:', error);
    res.status(500).json({ 
      error: 'Proxy error', 
      details: error.message,
      cause: error.cause?.message || 'No cause provided',
      targetUrl
    });
  }
}

