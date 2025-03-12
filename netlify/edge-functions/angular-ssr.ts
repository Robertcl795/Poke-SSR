import { AngularAppEngine } from '@angular/ssr';
import { Context } from '@netlify/edge-functions';

const engine = new AngularAppEngine();

export default async (request: Request, context: Context) => {
  // Skip SSR for static assets
  const url = new URL(request.url);
  if (url.pathname.startsWith('/assets/') || url.pathname.match(/\.(js|css|ico|png|jpg|svg)$/)) {
    return;
  }

  try {
    return await engine.handle(request);
  } catch (error) {
    console.error('Error during SSR:', error);
    return new Response('Server Error', { status: 500 });
  }
};
