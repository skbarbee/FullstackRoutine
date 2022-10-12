// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema } = mongoose

const taskSchema = new Schema(
	{
		task: { type: String, required: true },
		complete: { type: Boolean, default: false, required: true },
        type: { 
			type: String,
			enum:  ['daily','weekly'],
			required: true }
		
	},
	{ timestamps: true }
)



/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = taskSchema
