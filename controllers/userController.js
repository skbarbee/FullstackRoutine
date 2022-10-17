////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const  axios  = require('axios')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()


// Routes

// GET to render the signup form
router.get('/signup', (req, res) => {
	res.render('auth/signup')
})

// POST to send the signup info
router.post('/signup', async (req, res) => {
	// set the password to hashed password
  req.body.password = await bcrypt.hash(
		req.body.password,
		await bcrypt.genSalt(10)
	)
	// create a new user
	User.create(req.body)
		// if created successfully redirect to login
		.then((user) => {
			res.redirect('/auth/login')
			// res.json({ user: user })
		})
		// if an error occurs, send err
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
			//console.log(error)
		})
})

// const getUserZip = (userName) => {
// 	return new Promise((res, rej) => {

// 		User.find({ username: userName }, (err, doc) => {
// 			if (err) rej(err)
// 			res(doc)
// 		})
// 	})
// }
router.get('/weather', (req, res) => {
	const username = req.session.username
	const loggedIn = req.session.loggedIn
	const userId = req.session.userId
	const zipCode = req.session.zipCode
	console.log(zipCode)
    axios(`http://api.weatherbit.io/v2.0/current?postal_code=${zipCode}&country=US&Key=${process.env.API_Key}&units=I`)
    .then(weatherJson => {
		const data= weatherJson.data.data
		// const weatherTable = data.data[0]
		const temp = data[0].app_temp
		const weatherTable = data[0].weather
		const cityName = data[0].city_name
		const windSpeed = data[0].wind_spd
		const time = data[0].ob_time
		const windCardnial = data[0].wind_cdir
		const precipitation = data[0].precip
		console.log("this is temp \n", temp, "this is the weeatherTable")
		//console.log("this is info", info)
    	//res.send(weatherJson.data)
        res.render('auth/weather', { data,cityName, zipCode, temp, username, loggedIn, userId,time,windCardnial, windSpeed, precipitation, weatherTable  })
    })
   
    .catch((error) => {
       console.log(error)
    })

})
///////////////////////////////
// two login routes
///////////////////////////////

// get to render the login form
router.get('/login', (req, res) => {
	res.render('auth/login')
})
// post to send the login info(and create a session)
router.post('/login', async (req, res) => {
	// console.log('request object', req)
	// get the data from the request body
	console.log('req.body', req.body);
	
	const { username, password } = req.body
	// then we search for the user
	User.findOne({ username: username })
		.then(async (user) => {
			// check if the user exists
			if (user) {
				// compare the password
				// bcrypt.compare evaluates to a truthy or a falsy value
				const result = await bcrypt.compare(password, user.password)

				if (result) {
					console.log('the user', user, 'the password', password);
					
					// store some properties in the session
					req.session.username = user.username
					req.session.loggedIn = true
					req.session.userId = user.id
					req.session.zipCode = user.zipCode

          			const { username, loggedIn, userId, zipCode } = req.session
					console.log('the zip code', req.session.zipCode )

					console.log('session user id', req.session.userId)
					// redirect to /examples if login is successful
					res.redirect('/routine/mine')
				} else {
					// send an error if the password doesnt match
					res.redirect('/error?error=username%20or%20password%20incorrect')
				}
			} else {
				// send an error if the user doesnt exist
				res.redirect('/error?error=That%20user%20does%20not%20exist')
			}
		})
		// catch any other errors that occur
		.catch((error) => {
			console.log('the error', error);
			
			res.redirect(`/error?error=${error}`)
		})
})

// logout route -> destroy the session
router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/')
	})
})

// Export the Router
module.exports = router
