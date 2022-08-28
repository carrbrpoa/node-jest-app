/* eslint-disable no-unused-vars */
import DatabaseAccessor from '../../../src/dataAccessors/DatabaseAccessor';
import PatientService from '../../../src/services/PatientService';
import { DummyPatientData } from '../../../src/types';
import Mock = jest.Mock;

const databaseAccessorMock = {
  getPatient: jest.fn(),
  createPatient: jest.fn(),
};

jest.mock('../../../src/dataAccessors/DatabaseAccessor', () => ({
  get: jest.fn().mockImplementation(() => databaseAccessorMock),
}));

describe('PatientService', () => {
  let patientService: PatientService;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('get()', () => {
    it('create a new instance as a singleton', () => {
      const _ = PatientService.get();
      expect(DatabaseAccessor.get).toHaveBeenCalledTimes(1);
    });

    it('do not re-construct', () => {
      const _ = PatientService.get();
      expect(DatabaseAccessor.get).toHaveBeenCalledTimes(0);
    });
  });

  describe('createPatient', () => {
    beforeEach(() => {
      patientService = PatientService.get();
      databaseAccessorMock.createPatient.mockResolvedValueOnce({});
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('call createPatient once with correct args', async () => {
      // act
      await patientService.createPatient(123, 'The Patient', '555');

      // assert
      expect((databaseAccessorMock.createPatient as Mock).mock.calls[0]).toEqual([123, 'The Patient', '555']);
    });
  });

  describe('getPatient', () => {
    let patient: DummyPatientData;
    beforeEach(() => {
      patientService = PatientService.get();
      patient = { id: 123, name: 'Someone', phone: '555-1111' };

      databaseAccessorMock.getPatient = jest.fn().mockResolvedValueOnce(patient);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('call getPatient once with correct args and results correctly', async () => {
      // act
      const result = await patientService.getPatientById(123);

      // assert
      expect((databaseAccessorMock.getPatient as Mock).mock.calls[0]).toEqual([123]);
      expect(result).toEqual(patient);
    });
  });
});
