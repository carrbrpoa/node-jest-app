import DatabaseAccessor from '../dataAccessors/DatabaseAccessor';
import { DummyPatientData } from '../types';

export default class PatientService {
  static instance: PatientService;

  protected databaseAccessor: DatabaseAccessor;

  constructor() {
    this.databaseAccessor = DatabaseAccessor.get();
    PatientService.instance = this;

    console.debug('PatientService: constructed.');
  }

  static get() {
    return PatientService.instance || new PatientService();
  }

  public getPatientById = async (patientId: number): Promise<DummyPatientData | undefined> => {
    try {
      return this.databaseAccessor.getPatient(patientId);
    } catch (err) {
      console.error(`Error in PatientService.getPatientById [patientId: ${patientId}]`);
      throw err;
    }
  };

  public createPatient = async (id: number, name: string, phone: string) => {
    try {
      return this.databaseAccessor.createPatient(id, name, phone);
    } catch (error) {
      console.error(`Error in PatientService.createPatient. [id: ${id}, name: ${name}, phone: ${phone}]`);
      throw error;
    }
  };
}
