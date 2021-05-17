const mongoose = require('mongoose')
const app = require('express')()
const bodyParser = require('body-parser')

// initializing environment variables below.
require('dotenv').config()

const urlparser = bodyParser.urlencoded({ extended: false })
const { Schema, model } = mongoose
const port = process.env.PORT || 8089

// Connecting to MongoDB below here
mongoose.connect(process.env.DB,
{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	// throw error if error occurs
	if (err) console.log(err);

	// logging feedback on successful connection to db
	console.log("connected to database!")
	
})

// Declaring the database schema below here
const DataSchema = new Schema({

	name: {type: String, require: true},
	email: {type: String, require: true},
	country: {type: String, require: true}
	
})

// using the schema to create a database model
const DataModel = model('Data', DataSchema)


// handling the root route get request
app.get('/', (req, res) => {

	res.status(200).json({
		message: "Welcome! Send a GET request to /users to get started."
	})
	
})


// handling get request to fetch all users data
app.get('/users', (req, res) => {
	DataModel.find({}, (error, data) => {

		if (error) return res.status(500).json({
			message: "Fetch Error! please try again."
		});

		else return res.status(200).json({ 
			message: "Success! All users data fetched successfully.",
			data: data
		});
		
	})
})


// handling request to fetch a single user by ID
app.get('/users/:id', (req, res) => {
	DataModel.find({ _id: req.params.id }, (error, data) => {

		if (error) return res.status(404).json({
			message: "Fetch Error! Can't find any user with the provided ID."
		});
		else return res.status(200).json({ 
			message: "Success! User data fetched sucessfully.",
			data: data
		})
	})
})

// handling the post request to create a new user account
app.post('/create', urlparser, (req, res) => {

	// getting the required fields from the body Object
    const { name, email, country } = req.body

    DataModel.findOne({email: req.body.email}, (err, obj) => {
    	if (err) return res.status(500).json({
    		message: "Oops! Something just went wrong while querying the collection."
    	});
    	else {

    		// verifying if the email provided doesn't already exist
    		if (obj) return res.status(409).json({
    			message: "User with the email address already exists, please use another one."
    		});
    		else {

    			// creating the user account below here if the email is unique
				DataModel.create({ name, email, country }, (error, newData) => {
	
					if (error) return res.status(500).json({
						message: "Create Error! unable to save post data"
					});
		
					else return res.status(201).json({
						message: "Success! data saved successfully.",
						data: newData
					})
		
				})
			}
		}
	})
})


// handling the request to delete a user by ID
app.delete('/remove/:id', (req, res) => {

	DataModel.deleteOne(
		{ _id: req.params.id}, (error, data) => {
			if (error) return res.json({
				message: "Delete Error! no item with the given ID."
			});
			else if (!error) return res.json({
				message: "Success! Data deleted successfully."
			})
		}
	)
	
})


// handling the request to update a user details by ID
app.put('/edit/:id', urlparser, (req, res) => {

	let update = req.body
	DataModel.updateOne(
		{ _id: req.params.id },
		{ ...update }, 
		(error, data) => {
			if (error) return res.json({
				message: "Update Error! Can't find the item with the given id"
			});
			else return res.json({
				message: "Success! Data updated successfully."
			})
	})
})


// listening to requests below.
app.listen(port, () => {
	console.log(`server running at localhost:${port}`)
})
