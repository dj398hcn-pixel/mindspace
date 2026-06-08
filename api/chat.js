export const config = { runtime: 'edge' };

export default async function handler(req) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS')
    return new Response(null, { status: 200, headers: cors });

  if (req.method !== 'POST')
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...cors, 'Content-Type': 'application/json' },
    });

  const apiKey = process.env.ANTHROPIC_API_KEY
    || globalThis.ANTHROPIC_API_KEY
    || '';

  if (!apiKey)
    return new Response(JSON.stringify({ error: 'No API key', debug: Object.keys(process.env) }), {
      status: 500, headers: { ...cors, 'Content-Type': 'application/json' },
    });

  const { messages, system } = await req.json();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: system || 'You are PetPal AI, a warm and friendly virtual companion.',
      messages,
    }),
  });

  const data = await response.json();
  const reply = data.content?.[0]?.text || JSON.stringify(data);

  return new Response(JSON.stringify({ reply }), {
    status: 200, headers: { ...cors, 'Content-Type': 'application/json' },
  });
}
