import { netlifyAppEngineHandler } from '../../server';

export default async function handler(request: any, context: any) {
  // Log incoming request details
  console.log(`Edge Function processing: ${request.method} ${request.url}`);
  console.log(`Headers: ${JSON.stringify(Object.fromEntries(request.headers))}`);

  // Let static assets bypass the Edge Function
  const url = new URL(request.url);
  console.log(`Path: ${url.pathname}`);

  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.png')
  ) {
    console.log('Static asset detected, bypassing Edge Function');
    return context.next();
  }

  try {
    // Handle SSR for everything else
    console.log('Attempting SSR with Angular App Engine');
    const response = await netlifyAppEngineHandler(request);
    console.log(`SSR response status: ${response?.status || 'null'}`);
    return response;
  } catch (error: any) {
    console.error('Error in Edge Function:', error);
    return new Response(`Edge Function Error: ${error.message}`, { status: 500 });
  }
}
