import { FastifyInstance } from 'fastify';
import Routes from './routes';

export default async function router(app: FastifyInstance) {
  for (const route of Routes) {
    app.register(route);
  }
}
