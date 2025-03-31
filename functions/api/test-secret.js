export async function onRequest(context) {
  const { env } = context;
  
  return new Response(JSON.stringify({
    hasApiKey: !!env.OPENAI_API_KEY,
    envKeys: Object.keys(env)
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
} 