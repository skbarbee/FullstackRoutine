///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Routine = require('./routine')
const User = require('./user')
const Affirmation = require('./affirmation')
const Task = require('./task')

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////
// save the connection in a variable
const db = mongoose.connection
console.log('db in seed', db)
db.on('open', () => {
	 const seedUser =[
	 	{username:"Sarah", password:"sarah"},
	 	{username:"Arabelle", password:"arabelle"},
	 	{username:"Jon", password:"jon"},
		{username:"Oz", password:"oz"}

	 ]

User.deleteMany({})	
.then((deletedUsers) =>{
	console.log('this is what .deleteMany returns', deleteUsers)
	// Seed Starter routine
	Routine.create(sarahRoutine)
	.then((data) => {
	console.log('Here are the new seed data',data)
	//always remember to close connection to db 
	db.close()
	})
	.catch(error => {
	console.log(error)
	//always remember to close connection to db
	db.close()
	})
		
})
})



