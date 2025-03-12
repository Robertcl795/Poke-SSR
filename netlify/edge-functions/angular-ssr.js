export default async function handler(request, context) {
  console.log('Edge Function test running');
  console.log('Available environment:', Object.keys(globalThis));

  const url = new URL(request.url);
  console.log('Requested path:', url.pathname);

  // Test response
  return new Response('Edge Function is working! Path: ' + url.pathname, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
