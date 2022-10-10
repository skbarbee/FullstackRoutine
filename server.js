////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')

const User = require("./models/user")
const Task = require("./models/task")
const Routine = require("./models/routine")
const Affirmation = require("./models/affirmation")
const path = require("path")
const RoutineRouter = require('./controllers/routineController')
const TaskRouter = require('./controllers/taskController')
const UserRouter = require('./controllers/userController')
const AffirmationRouter = require('./controllers/affirmationController')


// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/task', TaskRouter)
app.use('/routine',RoutineRouter)
app.use('/affirmation', AffirmationRouter)


app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})



//////////////////////////////
//      App Listener        //
//////////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})