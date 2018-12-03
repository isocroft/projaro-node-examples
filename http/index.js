const dotenv = require('dotenv')
dotenv.config()
const http = require('http');
const express = require('express')
const compression = require('compression')
const etagger = require('etag')
const logger = require('morgan')
const bodyParser = require('body-parser')
const publicIp = require('public-ip')
const got = require('got')

// const router = require('./routes')

const app = express()

app.use(logger("dev"))
app.use(bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(compression({ filter: shouldCompress }))

function shouldCompress(request, response){
      if((request.header('x-requested-with') || "").toLowerCase() === 'xmlhttprequest'
         && request.header('x-no-compression') === 'true'){
            // don't compress responses with this request header
            return false
      }

      // fallback to standard filter function
      return compression.filter(request, response)
}

app.use(function countryCityDetector(request, response, next){
    const ip = await publicIp.v4()
    const response = await got(`http://ip-api.com/json/${ip}`, {json:true})
    
    response.locals.country = response.body.country
    response.locals.city = response.body.city;
      
    next()
});

app.get('/', (request, response) => {
  res.send('\n\nHome Page!\n\n');
});

app.get('/about-us', (request, response) => {
  res.send('\n\nAbout-Us Page!\n\n');
});

app.get('/contact-us', (request, response) => {
  res.send('\n\nContact-Us Page!\n\n');
});

      
/*let makeServer = function (request, response){
   console.log(request.url);
   console.log(request.headers);

   const requestTime = Date.now();
   const entityBody = 'Hello world!';
   
   const ip = response.socket.remoteAddress; // serverIp
   const port = response.socket.remotePort;
   const httpVersion = request.httpVersion;
   const httpVerb = request.method;
   const c_ip = request.headers['x-forwared-for'] || request.connection.remoteAddress || request.socket.remoteAddress // clientIp
   
   request.on('data', (chunk) => {
      console.log(`ENTITY BODY: ${chunk}`);
   });
   
   request.on('end', () => {
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
}*/
      
const server = http.createServer(app);

console.log(process.pid) // process ID

process.on('uncaughtException', (err) => { // An error handler for the process should in case it crashes
  console.log('Oops!');
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(process.env.PORT, () => {
  console.log(`Node server created at port ${process.env.PORT}`);
});
