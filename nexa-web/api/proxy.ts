import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ignorar favicon y llamadas vacías
  if (req.url === '/favicon.ico') return res.status(404).end();

  const baseUrl = process.env.AWS_API_URL || 'http://localhost:8080';
  
  // Vercel rewrites: /api/v1/(.*) -> /api/proxy
  // req.url in Vercel preserves the ORIGINAL path like /api/v1/auth/login
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

    // Vercel Serverless ya parsea req.body si es JSON
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);
    
    // Leer el body de la respuesta
    const text = await response.text();
    
    // Copiar el status code
    res.status(response.status);
    
    // Devolver JSON si se puede parsear, sino texto
    try {
      res.json(JSON.parse(text));
    } catch {
      res.send(text);
    }
  } catch (error: any) {
    console.error('Proxy Fetch Error:', error);
    res.status(500).json({ error: 'Proxy error', details: error.message });
  }
}

