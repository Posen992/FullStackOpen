import { NewPatient, Gender } from './type'

export const toNewPatient = (object: unknown): NewPatient => {
	if (!isNewPatient(object)) {
		throw new Error('Incorrect or missing data')
	}

	if (
		'name' in object &&
		'ssn' in object &&
		'occupation' in object &&
		'gender' in object &&
		'dateOfBirth' in object &&
		'entries' in object
	) {
		const newPatient: NewPatient = {
			name: object.name,
			ssn: object.ssn,
			occupation: object.occupation,
			gender: parseGender(object.gender),
			dateOfBirth: parseDate(object.dateOfBirth),
			entries: object.entries,
		}

		return newPatient
	}
	throw new Error('Incorrect data: some fields are missing')
}

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String
}

const isGender = (param: unknown): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param as string)
}

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender) || !isString(gender)) {
		throw new Error('Incorrect or missing gender' + gender)
	}
	return gender
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

const isNewPatient = (object: any): object is NewPatient => {
	return (
		isString(object.name) &&
		isString(object.ssn) &&
		isString(object.occupation) &&
		isGender(object.gender) &&
		isDate(object.dateOfBirth)
	)
}
