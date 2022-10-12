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
// router.use((req, res, next) => {
// 	// checking the loggedIn boolean of our session
// 	if (req.session.loggedIn) {
// 		// if they're logged in, go to the next thing(thats the controller)
// 		next()
// 	} else {
// 		// if they're not logged in, send them to the login page
// 		res.redirect('/auth/login')
// 	}
// })
// edit route -> GET that takes us to the edit form view
router.get("/edit/:routineId/:taskId", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
	const theTask = {task: req.body.task, complete: req.body.complete, type: req.body.type, owner: req.body.owner}
    const routineId= req.params.routineId
	const taskId = req.params.taskId
	console.log("edit request called")
	
    Routine.findById(routineId)
        // render the edit form 
        .then(routine => {
            res.render('task/edit', { routine, username, loggedIn, userId, theTask })
        })
        // redirect if there isn't
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
    // res.send('edit page')
})
///////////////////////////////
/////Add TASK to Exisitng Routine: POST ROUTE
///////////////////////////////

//find routine by Id then CREATE a new task 
router.post('/:id', (req, res) => {
	const routineId= req.params.id
	req.body.complete = req.body.complete === 'on' ? true : false
	req.body.owner = req.session.userId
	const theTask = {task: req.body.task, complete: req.body.complete, type: req.body.type, owner: req.body.owner}
	Routine.findById(routineId)
		.then((routine) =>{
			// console.log("this is body", req.body)
			routine.listItems.push(req.body)
			//console.log("this is the list item", routine.listItems)
			//console.log("this is the new routine", routine)
			//console.log("this is the routine id", routine.id)
			return routine.save()
			
			
		})
		.then(routine =>{
			res.redirect(`/routine/${routine.id}`)
		})
		.catch((error) => {
			// res.redirect(`/error?error=${error}`)
			console.log(error)
		})
})

///////////////////////////////
////EDIT exisiting Task: put ROUTE
///////////////////////////////
router.put('/:routineId/:taskId', (req, res) => {
	const routineId= req.params.routineId
	const taskId = req.params.taskId
	
	const theTask = {task: req.body.task, complete: req.body.complete, type: req.body.type, owner: req.session.userId}
	

	req.body.complete = req.body.complete === 'on' ? true : false
	Routine.findByIdAndUpdate(taskId, req.body, { new: true })
		.then(routine => {
			res.redirect(`/routine/${routine.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})
// Export the Router
module.exports = router
