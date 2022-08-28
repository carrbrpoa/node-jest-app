import { DummyPatientData } from '../types';

export default class DatabaseAccessor {
  static instance: DatabaseAccessor;
  private data: DummyPatientData[]; // simulating database

  constructor() {
    DatabaseAccessor.instance = this;
    this.data = [];
    console.debug('DatabaseAccessor: constructed.');
  }

  static get() {
    return DatabaseAccessor.instance || new DatabaseAccessor();
  }

  async getPatient(id: number): Promise<DummyPatientData | undefined> {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.data.find(patient => patient.id == id));
        }, 1000); // simulating real request
      });
    } catch (e) {
      console.error('Error in DatabaseAccessor.getPatient');
      throw e;
    }
  }

  async createPatient(id: number, name: string, phone: string): Promise<void> {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.data.push({ id, name, phone } as DummyPatientData);
          resolve();
        }, 1000); // simulating real request
      });
    } catch (e) {
      console.error('Error in DatabaseAccessor.createPatient');
      throw e;
    }
  }
}
