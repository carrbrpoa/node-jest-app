import fastify from 'fastify';
import schema from './schemas';
import router from './router';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ?? 3131; // default port to listen

const server = fastify();

schema(server);
server.register(router);

server.listen(port, host, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`Server started at http://${host}:${port}`);
});
