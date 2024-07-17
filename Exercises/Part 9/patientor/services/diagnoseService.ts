import diagnoseData from '../data/diagnoses'
import { Diagnosis } from '../type'

const diagnoses: Diagnosis[] = diagnoseData

const getDiagnoses = (): Diagnosis[] => {
	return diagnoses
}

export default {
	getDiagnoses,
}
