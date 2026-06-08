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

  const apiKey = process.env.GEMINI_API_KEY || '';

  if (!apiKey)
    return new Response(JSON.stringify({ error: 'No API key' }), {
      status: 500, headers: { ...cors, 'Content-Type': 'application/json' },
    });

  const { messages, system } = await req.json();

  // Convert messages format for Gemini
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const response = await fetch(
    https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey},
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system || 'You are PetPal AI, a warm and friendly virtual companion.' }] },
        contents,
        generationConfig: { maxOutputTokens: 300 }
      }),
    }
  );

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data);

  return new Response(JSON.stringify({ reply }), {
    status: 200, headers: { ...cors, 'Content-Type': 'application/json' },
  });
}
