// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const taskSchema = require('./task')
// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const routineSchema = new Schema(
	{
		title: { type: String, required: true },
		task: {taskSchema}
	}
)

const Routine = model('Routine', routineSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Routine
