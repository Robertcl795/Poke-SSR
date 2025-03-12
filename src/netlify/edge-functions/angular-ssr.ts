import { netlifyAppEngineHandler } from '../../server';

export default async function handler(request: any, context: any) {
  // Let static assets bypass the Edge Function
  const url = new URL(request.url);
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.png')
  ) {
    return context.next();
  }

  // Handle SSR for everything else
  return netlifyAppEngineHandler(request);
}
