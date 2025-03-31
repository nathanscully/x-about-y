import type { APIRoute } from 'astro';
import { getXValueById, getYValueById, generatePostKey } from '../../lib/utils';
import { generatePost, canGenerateNewPost, incrementGenerationCounter } from '../../lib/openai';

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    // Get KV namespaces from runtime environment
    const { XABOUTY_POSTS, XABOUTY_GENERATION_COUNTER, OPENAI_API_KEY } = locals.runtime.env;
    
    // Get daily generation limit
    const dailyLimit = parseInt(locals.runtime.env.DAILY_GENERATION_LIMIT || '100', 10);

    // Get URL parameters
    const url = new URL(request.url);
    const xId = url.searchParams.get('x');
    const yId = url.searchParams.get('y');
    const forceGenerate = url.searchParams.get('force') === 'true';

    // Validate parameters
    if (!xId || !yId) {
      return new Response(
        JSON.stringify({ error: 'Missing parameters. Both x and y are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get X and Y values
    const xValue = getXValueById(xId);
    const yValue = getYValueById(yId);

    if (!xValue || !yValue) {
      return new Response(
        JSON.stringify({ error: 'Invalid x or y value.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create KV key for this post
    const postKey = generatePostKey(xId, yId);

    // Check if we already have a generated post for this combination
    let postData = forceGenerate ? null : await XABOUTY_POSTS.get(postKey, 'json');

    // If not found, generate a new post
    if (!postData) {
      // Check if we've hit our daily generation limit
      const canGenerate = await canGenerateNewPost(XABOUTY_GENERATION_COUNTER, dailyLimit);
      if (!canGenerate) {
        return new Response(
          JSON.stringify({ 
            error: 'Daily generation limit reached. Try again tomorrow or use an existing combination.' 
          }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Generate the post
      const { post } = await generatePost(
        xValue,
        yValue,
        OPENAI_API_KEY
      );

      // Save to KV and increment counter
      postData = {
        content: post.content,
        xValue: xValue.activity,
        yValue: yValue.concept,
        createdAt: new Date().toISOString()
      };

      await XABOUTY_POSTS.put(postKey, JSON.stringify(postData));
      await incrementGenerationCounter(XABOUTY_GENERATION_COUNTER);
    }

    // Return the post data
    return new Response(
      JSON.stringify({
        success: true,
        post: postData
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
        } 
      }
    );
  } catch (error) {
    console.error('Error in post API:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 