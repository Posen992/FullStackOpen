interface ExerciseResult {
	periodLength: number
	trainingDays: number
	success: boolean
	rating: number
	ratingDescription: string
	target: number
	average: number
}

export const calculateExercises = (args: number[], target: number): ExerciseResult => {
	const periodLength: number = args.length
	const trainingDays: number = args.filter((x) => x > 0).length
	const average: number = args.reduce((a, b) => a + b, 0) / args.length
	let rating: number = 0
	let ratingDescription: string = ''

	if (average < target - 0.2) {
		rating = 1
		ratingDescription = "Don't be lazy"
	} else if (average >= target) {
		rating = 3
		ratingDescription = 'You are doing great!'
	} else {
		rating = 2
		ratingDescription = 'not too bad but could be better'
	}

	const success: boolean = average >= target

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	}
}

// const args: number[] = process.argv.slice(2).map((x) => {
// 	if (isNaN(Number(x))) throw new Error('Provided values were not numbers!')
// 	return Number(x)
// })

// if (args.length < 2) throw new Error('Not enough arguments')

// const target: number = Number(args.pop())
// const dailyExercises: number[] = args

// console.log(calculateExercises(dailyExercises, target))
