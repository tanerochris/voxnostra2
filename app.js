/* eslint-disable global-require */
/* eslint-disable no-console */
const next = require('next');
const http = require('http');
const glob = require('glob');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handleNextRequests = app.getRequestHandler();

app.prepare().then(() => {
  const server = new http.Server((req, res) => {
    // Add assetPrefix support based on the hostname
    const models = glob.sync('models/**/*.model.js', {});
    models.forEach((modelFilePath) => require(`./${modelFilePath}`));
    handleNextRequests(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
