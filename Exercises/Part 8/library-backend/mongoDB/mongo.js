const mongoose = require('mongoose')
require('dotenv').config()

const connectMongoDB = () => {
	const MONGODB_URI = process.env.MONGODB_URI

	mongoose.set('strictQuery', false)

	console.log('connecting to', MONGODB_URI)

	mongoose
		.connect(MONGODB_URI)
		.then(() => {
			console.log('connected to MongoDB')
		})
		.catch((error) => {
			console.log('error connection to MongoDB:', error.message)
		})

	mongoose.set('debug', true)
}

module.exports = {
	connectMongoDB,
}
