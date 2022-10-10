///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Routine = require('../models/routine')
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
		{username:"Sarah", password:"user1"},
		{username:"Lauren", password:"user2"},
		{username:"Melanie", password:"user3"}

	]
	
User.deleteMany({})
.then((deletedUsers) =>{
	console.log('this is what .deleteMany returns', deletedUsers)
	// Seed Starter users
	User.create(seedUser)
	.then((data) => {
	console.log('Here are the new seed users',data)
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



