// Import Dependencies
const express = require('express')
const User = require("../models/user")
const Task = require("../models/task")
const Routine = require("../models/routine")
const Affirmation = require("../models/affirmation")

// Create router
const router = express.Router()

// // Router Middleware
// // Authorization middleware
// // If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
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

// Routes

// index ALL
router.get('/', (req, res) => {
	Affirmation.find({})
		.then(affirmations => {
			// const username = req.session.username
			// const loggedIn = req.session.loggedIn
			res.json({affirmations:affirmations})
			// res.render('examples/index', { examples, username, loggedIn })
		})
		.catch(error => {
			// res.redirect(`/error?error=${error}`)
			res.send(error)
		})
})

// index that shows random affirmation
router.get('/random/', (req, res) => {
	const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    const randomNumber = Math.floor((Math.random())* (20-1)+1)
	console.log("the random number is ", randomNumber)
	
	Affirmation.find({ id: (randomNumber) })
	
		.then(affirmation => {
			const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
			const picture = affirmation.picture
			const id = affirmation.id
			const altText = affirmation.altText

            res.json({ affirmation: affirmation })
            // res.render('affirmation/random', { picture, id, altText, username, loggedIn, userId })
		})
		.catch(error => {
			// res.redirect(`/error?error=${error}`)
			res.send(error)
		})
})

// new route -> GET route that renders our page with the form
// router.get('/new', (req, res) => {
// 	const { username, userId, loggedIn } = req.session
// 	res.render('examples/new', { username, loggedIn })
// })

// create -> POST route that actually calls the db and makes a new document
// router.post('/', (req, res) => {
// 	req.body.ready = req.body.ready === 'on' ? true : false

// 	req.body.owner = req.session.userId
// 	Example.create(req.body)
// 		.then(example => {
// 			console.log('this was returned from create', example)
// 			res.redirect('/examples')
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// edit route -> GET that takes us to the edit form view
// router.get('/:id/edit', (req, res) => {
// 	// we need to get the id
// 	const exampleId = req.params.id
// 	Example.findById(exampleId)
// 		.then(example => {
// 			res.render('examples/edit', { example })
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// update route
// router.put('/:id', (req, res) => {
// 	const exampleId = req.params.id
// 	req.body.ready = req.body.ready === 'on' ? true : false

// 	Example.findByIdAndUpdate(exampleId, req.body, { new: true })
// 		.then(example => {
// 			res.redirect(`/examples/${example.id}`)
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// // show route
// router.get('/:id', (req, res) => {
// 	const exampleId = req.params.id
// 	Example.findById(exampleId)
// 		.then(example => {
//             const {username, loggedIn, userId} = req.session
// 			res.render('examples/show', { example, username, loggedIn, userId })
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// // delete route
// router.delete('/:id', (req, res) => {
// 	const exampleId = req.params.id
// 	Example.findByIdAndRemove(exampleId)
// 		.then(example => {
// 			res.redirect('/examples')
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// Export the Router
module.exports = router
