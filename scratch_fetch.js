const http = require('http');

http.get('http://localhost:3000', (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('HEADERS:', res.headers);
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('BODY LENGTH:', body.length);
    console.log('BODY:', body);
  });
}).on('error', (err) => {
  console.error('ERROR:', err);
});
