const mongoose = require('mongoose')
const app = require('express')()
const bodyParser = require('body-parser')

const urlparser = bodyParser.urlencoded({ extended: false })
const { Schema, model } = mongoose

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

app.get(['/', '/fetch'], (req, res) => {
	DataModel.find({}, (error, data) => {
	
		if (error) return res.json({
			message: "Fetch Error! please try again."
		});
		else return res.json({ data });
		
	})
})

app.get('/fetch/:id', (req, res) => {
	DataModel.find({ _id: req.params.id }, (error, data) => {
		if (error) return res.json({
			message: "Fetch Error! Can't find any item with the provided ID."
		});
		else return res.json({ data })
	})
})

app.post('/add', urlparser, (req, res) => {
	
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

app.delete('/delete/:id', (req, res) => {
	DataModel.deleteOne(
		{ _id: req.params.id}, (error, data) => {
			if (error) return res.json({
				message: "Delete Error! no item with the given ID."
			});
			else if (!error) return res.json({
				message: "Success! Data deleted successfully.",
				data: data
			})
		}
	)
})

app.put('/update/:id', urlparser, (req, res) => {

	let update = req.body
	DataModel.updateOne(
		{ _id: req.params.id },
		{ ...update }, 
		(error, data) => {
			if (error) return res.json({
				message: "Update Error! Can't find the item with the given id"
			});
			else return res.json({
				message: "Success! Data updated successfully.",
				data: data
			})
		})
})

app.listen(3000, () => {
	console.log("server running at localhost:3000")
})
