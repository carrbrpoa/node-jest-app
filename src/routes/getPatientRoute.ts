import { FastifyInstance } from 'fastify';

import { FastifyRequest, FastifyReply } from 'fastify';
import PatientService from '../services/PatientService';
import { DummyPatientData } from '../types';

const handler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as Partial<DummyPatientData>;
    const patientService = PatientService.get();
    const patient = await patientService.getPatientById(id!);
    reply.status(200).send(patient);
  } catch (err) {
    console.error('Error in getPatientRoute.handler.');
  }
};

export default async function getPatient(app: FastifyInstance) {
  app.get('/patient/:id', handler);
}
