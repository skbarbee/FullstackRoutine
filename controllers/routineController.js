// Import Dependencies
const express = require('express')
const User = require("../models/user")
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
const getRandomAffirmation = () => {
	return new Promise((res, rej) => {
		const randomNumber = Math.floor(Math.random() * (20 - 1) + 1)
		Affirmation.find({ rando: randomNumber }, (err, doc) => {
			if (err) rej(err)
			res(doc)
		})
	})
}
const getUserRoutines = (user) => {
	return new Promise((res, rej) => {

		Routine.find({ owner: user }, (err, doc) => {
			if (err) rej(err)
			res(doc)
		})
	})
}

router.get('/mine', (req, res) => {
	// find the routines, by ownership
	// let affirmation = []
	// let routines = []
	const username = req.session.username
	const loggedIn = req.session.loggedIn
	const userId = req.session.userId

	Promise.all([getRandomAffirmation(), getUserRoutines(userId)])
		.then(data => {
			const picture = data[0][0].picture
			const id = data[0][0].rando
			const altText = data[0][0].altText
			routines = data[1]
			// console.log(picture, id, altText)
			// console.log(data[1])
			res.render('routine/index', { routines, username, loggedIn, userId, picture, id, altText })

		})



		// console.table(affirmation)
		// 			console.table(routines)
		// 			res.render('routine/index', { routines, username, loggedIn, userId, picture, id, altText }))

		.catch(error => console.error)
	// 

	// 			const picture = affirmation[0][0].picture
	// 			const id = affirmation[0][0].rando
	// 			const altText = affirmation[0][0].altText
	// 			// console.log(picture, id, altText)
	// 			console.table(affirmation)
	// 			console.table(routines)
	// 			res.render('routine/index', { routines, username, loggedIn, userId, picture, id, altText })
	// 		})

	// 		// or throw an error if there is one
	// 		.catch(err => res.redirect(`/error?error=${err}`))

})

//new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {

	const theTask = { task: req.body.task, complete: req.body.complete, type: req.body.type, owner: req.session.userId }
	const theRoutine = { title: req.body.title, listItems: req.body.listItems }
	const { username, userId, loggedIn } = req.session
	res.render('routine/new', { username, loggedIn })
})


///////////////////////////////
///// CREATE NEW ROUTINE: POST ROUTE
///////////////////////////////

router.post('/', (req, res) => {

	req.body.owner = req.session.userId

	Routine.create(req.body)

		.then(routine => {
			// 
			res.redirect('/routine/mine')
			// res.sendStatus(201)

		})
		.catch(error => {
			// res.redirect(`/error?error=${error}`)
			console.log(error)
		})
})

// edit route -> GET that takes us to the edit form view
router.get("/edit/:id", (req, res) => {
	const username = req.session.username
	const loggedIn = req.session.loggedIn
	const userId = req.session.userId

	const routineId = req.params.id
	console.log("this is the get edit in routine")
	Routine.findById(routineId)
		// render the edit form 
		.then(routine => {
			res.render('routine/edit', { routine, username, loggedIn, userId })
		})
		// redirect if there isn't
		.catch(err => {
			res.redirect(`/error?error=${err}`)
		})
	// res.send('edit page')
})

///////////////////////////////
///// UPDATE Routine: PUT ROUTE
///////////////////////////////

router.put('/:id', (req, res) => {
	const routineId = req.params.id

	const theTask = { task: req.body.task, complete: req.body.complete, type: req.body.type, owner: req.session.userId }
	const theRoutine = { title: req.body.title, listItems: req.body.listItems }

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
/////SHOW EXISITING ROUTINE-GET
///////////////////////////////
router.get('/:id', (req, res) => {
	const routineId = req.params.id
	Routine.findById(routineId)
		.then(routine => {
			const { username, loggedIn, userId } = req.session
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
			res.redirect('/routine/mine')
		})
		.catch(error => {
			// res.redirect(`/error?error=${error}`)
			res.send(error)
		})
})
////////////////////////////////////////////////////////////////////////////////////////////////
///// ROUTES TO GET TO VIEW PAGES
////////////////////////////////////////////////////////////////////////////////////////////////






////////////////////////////////////////////////////////////////////////////////////////////////
///// EXPORT THE ROUTER
////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router
