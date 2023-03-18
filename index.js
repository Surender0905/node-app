const http = require('http');

const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

// const data = { name: 'roshan' }; // server doen't knw it is jason data.. so every thing should be string
// const data_string = JSON.stringify(data);

const products = data.products;

const server = http.createServer((req, res) => {
  console.log(req.url);

  // res.setHeader('token', 'dummy');

  if (req.url.startsWith('/product')) {
    const id = req.url.split('/')[2];
    const prd = products.find((p) => p.id === +id);
    const page = index
      .replace('**title**', prd.title)
      .replace('**url**', prd.thumbnail)
      .replace('**price**', prd.price);

    res.end(page);
    return;
  }
  switch (req.url) {
    case '/':
      res.setHeader('Content-Type', 'text/html');

      res.end(index);
      break;
    case '/api':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      break;

    default:
      res.writeHead(404, 'Not found');
      res.end();
  }
  console.log('server started');

  //   res.setHeader('Content-Type', 'application/json');
});

server.listen(8080); //// running on this port by binding with server
