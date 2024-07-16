import express, { response } from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (req, res) => {
	res.send('Hello World')
})

app.get('/bmi', (req, res) => {
	if (
		!req.query.height ||
		!req.query.weight ||
		isNaN(Number(req.query.height)) ||
		isNaN(Number(req.query.weight))
	) {
		res.json({ error: 'malformatted parameters' })
	}
	const height: number = Number(req.query.height)
	const weight: number = Number(req.query.weight)

	const result = {
		height,
		weight,
		bmi: calculateBmi(height, weight),
	}
	res.json(result)
})

app.post('/exercises', (request, response) => {
	const { daily_exercises, target } = request.body
	if (!daily_exercises || !target) {
		response.json({ error: 'parameters missing' })
	} else if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
		response.json({ error: 'malformatted parameters' })
	} else {
		const result = calculateExercises(daily_exercises, target)
		response.json(result)
	}
})

app.listen(3001, () => {
	console.log(`Server running on port 3001`)
})
