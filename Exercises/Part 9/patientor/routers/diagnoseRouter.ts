import express from 'express'
import diagnoseService from '../services/diagnoseService'

console.log(diagnoseService)
const diagnoseRouter = express.Router()

diagnoseRouter.get('/', (_req, res) => {
	
	res.json(diagnoseService.getDiagnoses())
})


export default diagnoseRouter
