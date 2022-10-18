// Import Dependencies
const express = require('express')
// Nit: remove unused User import
const User = require("../models/user")
// Nit: remove unused Routine import
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
			res.json({ affirmations: affirmations })
			// res.render('examples/index', { examples, username, loggedIn })
		})
		.catch(error => {
			// res.redirect(`/error?error=${error}`)
			res.send(error)
		})
})

// index that shows random affirmation
router.get('/random/', (req, res) => {
	// Nit: remove usused vars, lines 46 to 48
	const username = req.session.username
	const loggedIn = req.session.loggedIn
	const userId = req.session.userId
	const randomNumber = Math.floor((Math.random()) * (20 - 1) + 1)
	// Nit: remove console.log
	console.log("the random number is ", randomNumber)

	Affirmation.find({ rando: (randomNumber) })

		.then(affirmation => {
			// Nit: remove console.log
			console.log(affirmation[0])
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId
			const picture = affirmation[0].picture
			const id = affirmation[0].id
			const altText = affirmation[0].altText
			// Nit: remove console.log
			console.log(picture, id, altText)
			// res.json({ affirmation: affirmation })
			res.render('affirmation/random', { picture, id, altText, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
			
		})
})

router.get('/picture', (req, res) => {
	// Nit: remove unused vars, lines 77 to 80
	const username = req.session.username
	const loggedIn = req.session.loggedIn
	const userId = req.session.userId
	// This is the second time you are using this logic. Move this to the global scope of the file and just refer to it in each function scope
	const randomNumber = Math.floor((Math.random()) * (20 - 1) + 1)
	// Nit: remove console.log
	console.log("the random number is ", randomNumber)

	Affirmation.find({ id: (randomNumber) })

		.then(affirmation => {
			console.log(affirmation)
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId
			const picture = affirmation[0].picture
			const id = affirmation[0].id
			const altText = affirmation[0].altText
			// Nit: remove console.log
			console.log(picture, id, altText)
			// res.json({ affirmation: affirmation })
			res.render({ picture, id, altText, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
			//res.send(error)
		})
})

// Export the Router
module.exports = router
