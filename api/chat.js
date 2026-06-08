export const config = { runtime: 'edge' };

export default async function handler(req) {

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    const body = await req.json();
    const messages = body.messages || [];
    const system = body.system || 'You are Mental Care AI, a warm and friendly virtual companion.';

    const contents = messages.map(function(m) {
      return {
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      };
    });

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: contents,
        generationConfig: { maxOutputTokens: 300 }
      })
    });

    const text = await geminiRes.text();

    const data = JSON.parse(text);
    const reply = JSON.stringify(data);

    return new Response(JSON.stringify({ reply: reply }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ reply: 'Error: ' + err.message }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  }
}
