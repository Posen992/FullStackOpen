import patientsData from '../data/patients'
import { NonSSNPatient, Patient, NewPatient, parseEntry } from '../type'
import { v1 as uuid } from 'uuid'
import { toNewPatient } from '../utils'

const patients: Patient[] = patientsData.map((patient) => {
	const object = toNewPatient(patient) as Patient
	object.id = patient.id
	return object
})

const getPatients = (): Patient[] => {
	return patients
}

const findPatientById = (id: string): Patient | undefined => {
	const patient: Patient | undefined = patients.find(
		(patient) => patient.id === id
	)

	return patient
}

const addEntryByPatientId = (
	id: string,
	entryJson: string
): Patient | undefined => {
	const patient: Patient | undefined = patients.find(
		(patient) => patient.id === id
	)
	if (patient) {
		const newEntry = parseEntry(entryJson)
		newEntry.id = uuid()
	
		patient.entries.push(newEntry)
	}
	return patient
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
	findPatientById,
	addEntryByPatientId,
}
