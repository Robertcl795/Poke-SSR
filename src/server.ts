import { isMainModule } from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getContext } from '@netlify/angular-runtime/context';
import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
let angularAppEngine: AngularAppEngine;

try {
  angularAppEngine = new AngularAppEngine();
} catch (error) {
  console.error('Error initializing AngularAppEngine', error);
  process.exit(1);
}

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other routes with Angular SSR
 */
app.get('*', async (req: any, res: any) => {
  try {
    const context = getContext();
    const result = await angularAppEngine.handle(req, context);
    if (result) {
      res.send(result.body);
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    console.error('Error handling request', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  try {
    const result = await angularAppEngine.handle(request, context);
    return result || new Response('Not found', { status: 404 });
  } catch (error) {
    console.error('Error handling request', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
