// JSON Server module
const jsonServer = require('json-server');
const server = jsonServer.create();
const fs = require('fs');
const path = require('path');
const middlewares = jsonServer.defaults();
// Make sure the db.json is only read-only and served from memory to avoid errors when deployed to vercel.
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8')
);
const router = jsonServer.router(data);
const port = 8080;
server.use(middlewares);
server.use(
  // Add custom route here if needed
  jsonServer.rewriter({
    '/api/*': '/$1'
  })
);
server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running on port:', port);
});
// Export the Server API
module.exports = server;
