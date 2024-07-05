const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		minlength: 5,
	},
	published: {
		type: Number,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Author',
	},
	genres: [{ type: String }],
})

BookSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		console.log('transform')
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		console.log(returnedObject)
	},
})

module.exports = mongoose.model('Book', BookSchema)
