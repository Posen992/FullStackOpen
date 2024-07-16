import express from 'express'
import cors from 'cors'

import diagnoseRouter from './routers/diagnoseRouter';
import patientRouter from './routers/patientRouter';

const app = express()
app.use(cors())
app.use(express.json());

app.get('/api/ping', (_req, res) => {
	res.send('pong')
})


app.use('/api/diagnoses', diagnoseRouter)
app.use('/api/patients', patientRouter)

// app.get('/patients', (_req, res) => {
// 	res.send('pong2')
// })

app.listen(3001, () => {
	console.log('server running on port 3001')
})
