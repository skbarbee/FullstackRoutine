// Import Dependencies
const express = require('express')
const User = require("../models/user")
const Routine = require("../models/routine")

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

////////////////////////////////////////////////////////////////////////////////////////////////
///// ROUTES
////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////
///// INDEX ALL: GET REQUEST
///////////////////////////////
router.get('/', (req, res) => {
	Routine.find({})
	
		.populate("listItems")

		.then(routines => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const complete = req.body.complete = req.body.complete === 'on' ? true : false
			res.render('routine/index', { routines, username, loggedIn, complete })
			// res.json({ routines:routines })
		})
		.catch(error => {
			// res.redirect(`/error?error=${error}`)
			console.log(error)
		})
})

///////////////////////////////
///// INDEX USER: GET REQUEST
///////////////////////////////

router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Routine.find({ owner: userId })
		.then(routine => {
			res.render('routine/index', { routine, username, loggedIn })
			
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

//new route -> GET route that renders our page with the form
router.get('/new', (req, res) => 
{
	
	const theTask = {task: req.body.task, complete: req.body.complete, type: req.body.type, owner: req.session.userId}
	const theRoutine = { title: req.body.title, listItems:req.body.listItems}
	const { username, userId, loggedIn } = req.session
	res.render('routine/new', { username, loggedIn })
})
///////////////////////////////
///// CREATE NEW ROUTINE: POST ROUTE
///////////////////////////////

router.post('/', (req, res) => {
	req.body.complete = req.body.complete === 'on' ? true : false

	req.body.owner = req.session.userId
	const theTask = {task: req.body.task, complete: req.body.complete, type: req.body.type, owner: req.body.owner}
	const theRoutine = { title: req.body.title, listItems:req.body.listItems}
	

	console.log('the routine is being created',theRoutine, theTask)
	Routine.create(req.body,theTask)

		.then(routine => {
			console.log('this was returned from create', routine)
			res.redirect('/routine')
			// res.sendStatus(201)

		})
		.catch(error => {
			// res.redirect(`/error?error=${error}`)
			console.log(error)
		})
})


///////////////////////////////
///// UPDATE Routine: PUT ROUTE
///////////////////////////////

router.put('/:id', (req, res) => {
	const routineId= req.params.id
	
	const theTask = {task: req.body.task, complete: req.body.complete, type: req.body.type, owner: req.session.userId}
	const theRoutine = { title: req.body.title, listItems:req.body.listItems}

	req.body.complete = req.body.complete === 'on' ? true : false
	Routine.findByIdAndUpdate(routineId, req.body, { new: true })
		.then(routine => {
			res.redirect(`/routine/${routine.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})


///////////////////////////////
/////SHOW EXISITING ROUTING-GET
///////////////////////////////
router.get('/:id', (req, res) => {
	const routineId = req.params.id
	Routine.findById(routineId)
		.then(routine => {
            const {username, loggedIn, userId} = req.session
		res.render('routine/show', { routine, username, loggedIn, userId })
		
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

///////////////////////////////
/////DELETE ROUTINE: DELETE
///////////////////////////////
router.delete('/:id', (req, res) => {
	const routineId = req.params.id
	Routine.findByIdAndRemove(routineId)
		.then(routine => {
			res.redirect('/routine')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})
////////////////////////////////////////////////////////////////////////////////////////////////
///// ROUTES TO GET TO VIEW PAGES
////////////////////////////////////////////////////////////////////////////////////////////////

//new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('routine/new', { username, loggedIn })
})


// // edit route -> GET that takes us to the edit form view
// router.get('/:id/edit', (req, res) => {
// 	// we need to get the id
// 	const routineId = req.params.id
// 	Routine.findById(routineId)
// 		.then(routine => {
// 			res.render('routine/edit', { routine})
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

////////////////////////////////////////////////////////////////////////////////////////////////
///// EXPORT THE ROUTER
////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router
