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
	//  const seedUser =[
	//  	{username:"Sarah", password:"password"},
	//  	{username:"Lauren", password:"password"},
	//  	{username:"Melanie", password:"password"}

	//  ]
	const sarahRoutine =[
		{title:"Sarah's Routine", listItems:[
			{task:"brush teeth", complete:false, type:"daily", owner:"63446c88ef93fe950f1324b3" },
			{task:"take meds", complete:true, type:"daily", owner:"63446c88ef93fe950f1324b3" },
			{task:"work on project", complete:false, type:"weekly", owner:"63446c88ef93fe950f1324b3" }
		]}
	]
User.deleteMany({})	
Routine.deleteMany({})
.then((deletedRoutines) =>{
	console.log('this is what .deleteMany returns', deletedRoutines)
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



