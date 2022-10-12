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
ObjectId = Schema.Types.ObjectId
const db = mongoose.connection
console.log('db in seed', db)
db.on('open', () => {
	//  const seedUser =[
	//  	{username:"Sarah", password:"password"},
	//  	{username:"Lauren", password:"password"},
	//  	{username:"Melanie", password:"password"}

	//  ]
	const seedRoutine =[
		{title:"Daily Routine", 
		listItems:[
			{task:"brush teeth", complete:false, type:"daily" },
			{task:"take meds", complete:true, type:"daily" },
		],
		owner: `${ObjectId("6346cfe2b82fdbb50733069e")}`,
	},
		{title:"Weekly Goals", 
		listItems:[
			{task:"finish project", complete:false, type:"weekly", owner:"6346c9f95d78c99fdd816c57" },
			{task:"workout", complete:true, type:"weekly" },
		],
		owner: `${ObjectId("6346cfe2b82fdbb50733069e")}`
	},
		{title:"Daily Routine", listItems:[
			{task:"brush teeth", complete:false, type:"daily" },
			{task:"read daily", complete:true, type:"daily"},
		],
		owner:`${ObjectId("6346d016b82fdbb5073306a6")}`
	},
		{title:"Weekly Goals", 
		listItems:[
			{task:"finish project", complete:false, type:"weekly"},
			{task:"chores", complete:true, type:"weekly" },
		],
		owner: `${ObjectId("6346d016b82fdbb5073306a6")}`
	},
		{title:"Weekly Goals", 
		listItems:[
			{task:"finish project", complete:false, type:"weekly"},
			{task:"chores", complete:true, type:"weekly"},
		],
		owner: `${ObjectId("6346d009b82fdbb5073306a4")}`
		
	},
		{title:"Daily Routine", 
		listItems:[
			{task:"brush teeth", complete:false, type:"daily"},
			{task:"take meds", complete:true, type:"daily"},
		],
		owner: `${ObjectId("6346d009b82fdbb5073306a4")}`
	},

		{title:"Weekly Goals", 
		listItems:[
			{task:"read", complete:false, type:"weekly"  },
			{task:"workout", complete:true, type:"weekly" },
		],
		owner: `${ObjectId("6346cffdb82fdbb5073306a2")}`
	}

	]

Routine.deleteMany({})
.then((deletedRoutines) =>{
	console.log('this is what .deleteMany returns', deletedRoutines)
	// Seed Starter routine
	Routine.create(seedRoutine)
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



