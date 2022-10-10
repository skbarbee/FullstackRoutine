// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const taskSchema = new Schema(
	{
		task: { type: String, required: true },
		complete: { type: Boolean, default: false, required: true },
        type: { 
			type: String,
			enum:  ['dailyTask','weeklyGoals'],
			required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Task = model('Task', taskSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Task
