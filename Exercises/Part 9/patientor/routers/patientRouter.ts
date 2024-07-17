import express from 'express'
import patientService from '../services/patientService'
import { toNewPatient } from '../utils'

const patientRouter = express.Router()

patientRouter.get('/', (_req, res) => {
	res.send(patientService.getNonSSNPatients())
})

patientRouter.get('/:id', (req, res) => {
	res.send(patientService.findPatientById(req.params.id))
})

patientRouter.post('/', (req, res) => {
	try {
		const newPatient = toNewPatient(req.body)
		const addedPatient = patientService.addPatient(newPatient)
		res.json(addedPatient)
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message
		}
		res.status(400).send(errorMessage)
	}
})

patientRouter.post('/:id/entries', (req, res) => {
	try {
		const patient = patientService.addEntryByPatientId(req.params.id, req.body)
		res.status(201).send(patient)
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(400).send(error.message)
		}
	}
})

export default patientRouter
