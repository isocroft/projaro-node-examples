const http = require('http');
      
let makeServer = function (request, response){
   console.log(request.url);
   console.log(request.headers);

   const requestTime = Date.now();
   const entityBody = 'Hello world!';
   
   const ip = response.socket.remoteAddress; // serverIp
   const port = response.socket.remotePort;
   const httpVersion = request.httpVersion;
   const httpVerb = request.method;
   const c_ip = request.socket.remoteAddress // clientIp
   
   request.on('data', (chunk) => {
      console.log(`ENTITY BODY: ${chunk}`);
   });
   
   requset.on('end', () => {
      console.log('No more data in response.');
   });
   
   if(!response.headersSent){
     response.setHeader('X-Request-Time', String(requestTime));
     response.writeHead(200,
        {
          'Content-Type':'text/plain',
          'Content-Length':String(Buffer.byteLength(entityBody)),
          'Date': (new Date()).toGMTString(),
          'Connection': 'keep-alive'
        }
     );
   }
   response.write(entityBody);
   response.end();
},
      
server = http.createServer(makeServer);

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(3000, () => {
  console.log('Node server created at port 3000');
});
