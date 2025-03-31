import type { APIRoute } from 'astro';
import { getRandomXValue, getRandomYValue } from '../../lib/utils';

export const GET: APIRoute = async () => {
  try {
    // Get random X and Y values
    const xValue = getRandomXValue();
    const yValue = getRandomYValue();

    // Return the random values
    return new Response(
      JSON.stringify({
        success: true,
        x: xValue,
        y: yValue,
        redirect: `/post/${xValue.id}/${yValue.id}`
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error getting random values:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate random values' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 