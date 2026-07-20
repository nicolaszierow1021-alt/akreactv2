export const onRequest = async (context: any) => {
  const { request, next } = context;
  const url = new URL(request.url);
  const hostname = url.hostname;

  const incorrectDomains = [
    'akdescargass.store',
    'www.akdescargass.store',
    'www.akdescargas.store'
  ];

  if (incorrectDomains.includes(hostname)) {
    url.hostname = 'akdescargas.store';
    url.port = ''; // Clean port just in case
    url.protocol = 'https:';

    // 301 Permanent Redirect
    return Response.redirect(url.toString(), 301);
  }

  // Continue to the requested resource
  return next();
};
