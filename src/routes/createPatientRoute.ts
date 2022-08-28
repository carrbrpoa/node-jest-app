import { FastifyInstance } from 'fastify';

import { FastifyRequest, FastifyReply } from 'fastify';
import PatientService from '../services/PatientService';
import { DummyPatientData } from '../types';

const handler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id, name, phone } = req.body as DummyPatientData;
    const patientService = PatientService.get();
    await patientService.createPatient(id, name, phone);
    reply.status(201).send();
  } catch (err) {
    console.error('Error in createPatientRoute.handler.');
  }
};

export default async function createPatient(app: FastifyInstance) {
  app.post('/patient', handler);
}
