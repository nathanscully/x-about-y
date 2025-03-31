export async function onRequest(context) {
  // Get access to Cloudflare bindings
  const { env, request } = context;
  
  // Access your OpenAI API key - add logging to debug
  const openaiApiKey = env.OPENAI_API_KEY;
  
  // Log that we have the key (don't log the actual key in production)
  console.log("API Key present:", !!openaiApiKey);
  
  try {
    // Parse the request body if it's a POST request
    const body = await request.json();
    
    // Your API logic here
    // Example: Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: body.prompt || 'Generate a post' }
        ]
      })
    });
    
    const data = await response.json();
    
    // Return the response
    return new Response(JSON.stringify({
      success: true,
      data: data
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 