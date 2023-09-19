require('dotenv').config();
const debug = require('debug');
const { createServer } = require('http');

const app = require('./app');

const PORT = process.env.PORT ?? 4000;

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`serveur ready on http://localhost:${PORT}`);
    debug(`http://localhost:${PORT}`);
});
