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
	
	const affirmationSeed =[
		{
			picture:'../image/abilities.svg',
			altText:"I am confident in my abilities.",
			id: 1

		},
		{
			picture:'../image/abundance.svg',
			altText:"I have an abundance of time to do all the things in life I want to do.",
			id: 2

		},
		{
			picture:'../image/acceptance.svg',
			altText:"I accept myself for who I am and create peace, power, and confidence of mind and of heart.",
			id: 3

		},
		{
			picture:'../image/adaptable.svg',
			altText:"I am adaptable.I accept changes and can adjust to any situation.",
			id: 4

		},
		{
			picture:'../image/compassionate.svg',
			altText:"I am compassionate. I move with consciousness and care and practice self-forgivenss to love myself as I am.",
			id: 5

		},
		{
			picture:'../image/competent.svg',
			altText:"I am competent and knowledgeable.",
			id: 6

		},
		{
			picture:'../image/confident.svg',
			altText:"I am confident",
			id: 7

		},
		{
			picture:'../image/existing.svg',
			altText:"I am loved just for being who I am, just for existing.",
			id: 8

		},
		{
			picture:'../image/growth.svg',
			altText:"I am getting better and better every day.",
			id: 9

		},
		{
			picture:'../image/iAm.svg',
			altText:"Am I good enough? Yes I am. Michelle Obama",
			id: 10

		},
		{
			picture:'../image/persistent.svg',
			altText:"I am persistent. I continue progressing through all circumstances.",
			id: 11

		},
		{
			picture:'../image/perspective.svg',
			altText:"My perspective is unique.It's important and it counts. ",
			id: 12

		},
		{
			picture:'../image/powerful.svg',
			altText:"I am powerful.",
			id: 13

		},
		{
			picture:'../image/resourceful.svg',
			altText:"I use creative methods to construct the best possible life.",
			id: 14

		},
		{
			picture:'../image/rightTime.svg',
			altText:"I am in the right place at the right time, doing the right thing. ",
			id: 15

		},
		{
			picture:'../image/root.svg',
			altText:"I root for myself and those around me.",
			id: 16

		},
		{
			picture:'../image/song.svg',
			altText:"I am healthy, I am wealthy. I am rich, I am that bitch. I am gonna go get that bag. And I am not gonna take your shit (Uh). I am protected, well respected. I'm a queen, I'm a dream (Yeah). I do what I wanna do. And I'm who I wanna be. 'Cause I am me. Young Baby Tate",
			id: 17

		},
		{
			picture:'../image/successful.svg',
			altText:"I am successful",
			id: 18

		},
		{
			picture:'../image/triumphant.svg',
			altText:"I am triumphant.I celebrate all victories, big and small.",
			id: 19

		},
		{
			picture:'../image/worthy.svg',
			altText:"I am worthy of my achievements.",
			id: 20

		}
		
	
	]

Affirmation.deleteMany({})
.then((deletedAffirmations) =>{
	console.log('this is what .deleteMany returns', deletedAffirmations)
	// Seed Starter routine
	Affirmation.create(affirmationSeed)
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



