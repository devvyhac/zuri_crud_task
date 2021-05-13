const mongoose = require('mongoose')
const app = require('express')()
const bodyParser = require('body-parser')

const urlparser = bodyParser.urlencoded({ extended: false })
const { Schema, model } = mongoose
const port = process.env.PORT || 8089

mongoose.connect('mongodb+srv://devvyhac:ZuriCrud@zuricrudtask.m2ydc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

	if (err) console.log(err);
	console.log("connected to database!")
	
})

const DataSchema = new Schema({

	name: String,
	email: String,
	country: String
	
})

const DataModel = model('Data', DataSchema)

app.get(['/', '/users'], (req, res) => {
	DataModel.find({}, (error, data) => {
	
		if (error) return res.json({
			message: "Fetch Error! please try again."
		});
		else return res.json({ 
			message: "Success! All users data fetched successfully.",
			data: data
		});
		
	})
})

app.get('/users/:id', (req, res) => {
	DataModel.find({ _id: req.params.id }, (error, data) => {
		if (error) return res.json({
			message: "Fetch Error! Can't find any item with the provided ID."
		});
		else return res.json({ 
			message: "Success! User data fetched sucessfully.",
			data: data
		})
	})
})

app.post('/create', urlparser, (req, res) => {
	
    const { name, email, country } = req.body
    
	DataModel.create({ name, email, country }, (error, newData) => {
	
		if (error) return res.json({
			message: "Create Error! unable to save post data"
		});
		
		else return res.json({
			message: "Success! data saved successfully.",
			data: newData
		})
		
	})
	
})

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

app.listen(port, () => {
	console.log(`server running at localhost:${port}`)
})
