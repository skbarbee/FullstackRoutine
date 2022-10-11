// Import Dependencies
const express = require('express')
const User = require("../models/user")
const Task = require("../models/task")
const Routine = require("../models/routine")
const Affirmation = require("../models/affirmation")

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

///////////////////////////////
/////Add TASK to Exisitng Routine: POST ROUTE
///////////////////////////////

//find routine by Id then CREATE a new task 
router.post('/:id', (req, res) => {
	const routineId= req.params.id
	// req.body.ready = req.body.ready === 'on' ? true : false
	req.body.owner = req.session.userId
	const theTask = {task: req.body.task, complete: req.body.complete, type: req.body.type, owner: req.body.owner}
	Routine.findByIdAndUpdate(routineId, req.body, { new: true } )
		.then(routine =>{
			console.log("this is body", req.body)
			routine.listItems.addToSet(req.body)
			console.log("this is the list item", routine.listItems)
			console.log("this is the new routine", routine)
			console.log("this is the routine id", routine.id)
			res.status(201).json({ routine: routine.toObject() })
			
		})
		.then(routine =>{
			res.redirect(`/routine/${routine.id}`)
		})
	
	
		.catch((error) => {
			// res.redirect(`/error?error=${error}`)
			console.log(error)
		})
})
// Export the Router
module.exports = router
