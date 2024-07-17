export interface Diagnosis {
	code: string
	name: string
	latin?: string
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface Patient {
	id: string
	name: string
	dateOfBirth: string
	ssn: string
	gender: Gender
	occupation: string
	entries: Entry[]
}

export type NonSSNPatient = Omit<Patient, 'ssn'>
export type NewPatient = Omit<Patient, 'id'>
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>

export interface Discharge {
	date: string
	criteria: string
}

export interface SickLeave {
	startDate: string
	endDate: string
}

export interface BaseEntry {
	id: string
	description: string
	date: string
	specialist: string
	diagnosisCodes?: Array<Diagnosis['code']>
}

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck'
	healthCheckRating: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare'
	sickLeave: SickLeave
	employerName?: string
}

interface HospitalEntry extends BaseEntry {
	type: 'Hospital'
	discharge: Discharge
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String
}
const parseDescription = (string: unknown): string => {
	if (!string || !isString(string)) {
		throw new Error('Description is missing or invalid')
	}
	return string
}

const parseSpecialist = (string: unknown): string => {
	if (!string || !isString(string)) {
		throw new Error('Specialist is missing or invalid')
	}
	return string
}

const parseCiteria = (string: unknown): string => {
	if (!string || !isString(string)) {
		throw new Error('Citeria of discharge is missing or invalid ')
	}
	return string
}

const parseDischarge = (data: any): Discharge => {
	const newDischarge: Discharge = {
		date: parseDischargeDate(data.date),
		criteria: parseCiteria(data.criteria),
	}

	return newDischarge
}

const parseSickLeave = (data: any): SickLeave => {
	const newSickLeave: SickLeave = {
		startDate: parseSickLeaveStartDate(data.startDate),
		endDate: parseSickLeaveEndDate(data.endDate),
	}

	return newSickLeave
}

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(rating)
}
const parseHealthCheckRating = (rating: number): HealthCheckRating => {
	if (!isHealthCheckRating(rating)) {
		throw new Error('Health check rating is missing or invalid')
	}

	return rating
}

const parseEmployerName = (string: unknown): string => {
	if (!string || !isString(string)) {
		throw new Error('Employer name is missing or invalid')
	}
	return string
}

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date)
	}
	return date
}

const parseSickLeaveStartDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing startDate of sickLeave: ' + date)
	}
	return date
}

const parseSickLeaveEndDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing endDate of sickLeave: ' + date)
	}
	return date
}

const parseDischargeDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date of discharge: ' + date)
	}
	return date
}
export const parseEntry = (data: any): Entry => {
	let newEntry = {}
	switch (data.type) {
		case 'Hospital':
			newEntry = {
				description: parseDescription(data.description),
				date: parseDate(data.date),
				type: data.type,
				specialist: parseSpecialist(data.specialist),
				diagnosisCodes: parseDiagnosisCodes(data),
				discharge: parseDischarge(data.discharge),
			}
			break

		case 'HealthCheck':
			newEntry = {
				description: parseDescription(data.description),
				date: parseDate(data.date),
				type: data.type,
				specialist: parseSpecialist(data.specialist),
				diagnosisCodes: parseDiagnosisCodes(data),
				healthCheckRating: parseHealthCheckRating(Number(data.healthCheckRating)),
			}

			break
		case 'OccupationalHealthcare':
			newEntry = {
				description: parseDescription(data.description),
				date: parseDate(data.date),
				type: data.type,
				specialist: parseSpecialist(data.specialist),
				diagnosisCodes: parseDiagnosisCodes(data),
				employerName: parseEmployerName(data.employerName),
				sickLeave: parseSickLeave(data.sickLeave),
			}

			break
		default:
			throw new Error('Type missing ')
	}

	return newEntry as Entry
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
	console.log(!object)
	console.log(typeof object !== 'object')
	
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		// we will just trust the data to be in correct form
		
		return [] as Array<Diagnosis['code']>
	}

	return object.diagnosisCodes as Array<Diagnosis['code']>
}
