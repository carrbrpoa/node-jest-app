import { FastifyInstance } from 'fastify';
import patient from './patient';

const schemas = [patient];

export default (app: FastifyInstance) => {
  for (const schema of schemas) {
    console.debug(`Initialization: schema ${schema.$id} added.`);
    app.addSchema(schema);
  }
};
