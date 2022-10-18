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
		picture: { type: String, required: true },
		altText:{ type: String, required: true},
		// Nit: I know this is a personal project but you might have employers look through this. While I would heavily question working for someone that would have an issue with you naming a field `rando` you never know how someone will take something. This might be a flag as non professionalism. While both you and I know that is very far from the truth sometimes people read into things that they don't need to. Best thing is to keep your project varaibles and commit messages as professional as possible. Change this on over to `randomNumber` or something like that.
		rando: {type: Number, required: true}
		
	}
)

const Affirmation = model('Affirmation', affirmationSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Affirmation
