/**
 * Cloudflare Worker — Gemini API Proxy for Lift Strong PDF Import
 * ================================================================
 * SETUP STEPS:
 * 1. Go to dash.cloudflare.com → Workers & Pages → Create Worker
 * 2. Paste this entire file into the editor
 * 3. Change YOUR-USERNAME.github.io on line 16 to your actual GitHub Pages URL
 *    Example: https://heathsmith.github.io
 * 4. Click Save and Deploy — note your worker URL (e.g. my-worker.username.workers.dev)
 * 5. Go to Worker → Settings → Variables → Add Secret:
 *       Name:  GEMINI_API_KEY
 *       Value: your key from aistudio.google.com
 * 6. In your GitHub repo edit liftstrong/app.js and replace
 *    YOUR-WORKER-NAME.YOUR-USERNAME.workers.dev with your actual worker URL
 *
 * FREE TIER: 100,000 requests/day on Cloudflare, 15 req/min on Gemini — more than enough.
 */

const ALLOWED_ORIGIN = 'https://YOUR-USERNAME.github.io'; // ← change this

const GEMINI_MODEL = 'gemini-1.5-flash'; // fast, free, great at structured extraction
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export default {
  async fetch(request, env) {

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    // Only POST to /api/claude (keeping the same endpoint so app.js works unchanged)
    const url = new URL(request.url);
    if (request.method !== 'POST' || url.pathname !== '/api/claude') {
      return new Response('Not found', { status: 404 });
    }

    // Origin check — prevents anyone else from using your key
    const origin = request.headers.get('Origin') || '';
    if (ALLOWED_ORIGIN !== '*' && !origin.startsWith(ALLOWED_ORIGIN)) {
      return new Response('Forbidden', { status: 403 });
    }

    // Parse incoming request (sent in Anthropic format from app.js)
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Bad request — invalid JSON', { status: 400 });
    }

    // Extract the user message text (Anthropic format: body.messages[0].content)
    const userMessage = extractUserMessage(body);
    if (!userMessage) {
      return new Response('Bad request — no message content', { status: 400 });
    }

    // Call Gemini
    const geminiResp = await fetch(`${GEMINI_URL}?key=${env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: userMessage }]
        }],
        generationConfig: {
          temperature: 0.1,       // low temp = more consistent JSON output
          maxOutputTokens: 4096
        }
      })
    });

    if (!geminiResp.ok) {
      const err = await geminiResp.text();
      return new Response(
        JSON.stringify({ error: { message: 'Gemini API error: ' + err } }),
        { status: geminiResp.status, headers: { 'Content-Type': 'application/json', ...corsHeaders(request) } }
      );
    }

    const geminiData = await geminiResp.json();

    // Convert Gemini response format → Anthropic response format
    // so app.js doesn't need any changes
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const anthropicFormatted = {
      content: [{ type: 'text', text: text }],
      model: GEMINI_MODEL,
      stop_reason: 'end_turn'
    };

    return new Response(JSON.stringify(anthropicFormatted), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
    });
  }
};

/**
 * Pull the user message string out of the Anthropic-format request body.
 * Handles both plain string content and content array format.
 */
function extractUserMessage(body) {
  const messages = body?.messages;
  if (!messages || !messages.length) return null;
  const last = messages[messages.length - 1];
  if (typeof last.content === 'string') return last.content;
  if (Array.isArray(last.content)) {
    return last.content
      .filter(c => c.type === 'text')
      .map(c => c.text)
      .join('\n');
  }
  return null;
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
