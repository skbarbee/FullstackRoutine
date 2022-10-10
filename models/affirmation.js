// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const taskSchema = require('./task')
const Routine = require('./routine')
// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const affirmationSchema = new Schema(
	{
		affirmation: { type: String, required: true },
		number: {type: Number, required: true}
		
	}
)

const Affirmation = model('Affirmation', affirmationSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Affirmation
