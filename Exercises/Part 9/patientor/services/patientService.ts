import patientsData from '../data/patients'
import { NonSSNPatient, Patient, NewPatient } from '../type'
import { v1 as uuid } from 'uuid'
import { toNewPatient } from '../utils'

const patients: Patient[] = patientsData.map(patient => {
	const object = toNewPatient(patient) as Patient
	object.id = patient.id
	return object
})

const getPatients = (): Patient[] => {
	return patients
}

const getNonSSNPatients = (): NonSSNPatient[] => {
	return patients.map(({ ssn, ...rest }) => rest)
}

const addPatient = (patient: NewPatient): NonSSNPatient => {
	const newPatient = {
		id: uuid(),
		...patient,
	}
	patients.push(newPatient)
	const { ssn: _, ...patientWithoutSSN } = newPatient
	return patientWithoutSSN
}

export default {
	getPatients,
	getNonSSNPatients,
	addPatient,
}
