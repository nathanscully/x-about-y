export async function onRequest(context) {
  const { env, request } = context;
  
  // Access KV namespaces
  const postsKV = env.XABOUTY_POSTS;
  const counterKV = env.XABOUTY_GENERATION_COUNTER;
  
  try {
    const body = await request.json();
    
    // Generate a unique ID or use the one from the request
    const postId = body.id || crypto.randomUUID();
    
    // Save to KV
    await postsKV.put(postId, JSON.stringify(body.postData));
    
    // Increment counter
    let counter = await counterKV.get('total-posts', { type: 'json' }) || 0;
    counter++;
    await counterKV.put('total-posts', JSON.stringify(counter));
    
    return new Response(JSON.stringify({
      success: true,
      id: postId
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