const express = require('express')
const axios = require('axios')
const app = express()
const config = require('config');

const port = 3000
var bodyParser = require('body-parser')

app.use(bodyParser.json())

const httpClient = axios.create({
		method: 'post',
		baseURL: config.get('redmineBaseUrl'),
		timeout: 5000,
		headers: {
			'Content-Type': 'application/json'
			}
		})

app.post('/api/time_entries', (req, res) =>
    httpClient.post('/time_entries.json', {
		"time_entry":{
			"project_id":req.body.project,
			"hours":req.body.hours,
			"activity_id":req.body.activity,
			"comments":req.body.comments,
			"spent_on":req.body.date
		}
	},{
		headers: {'X-Redmine-API-Key': req.body.key}
	}).then(response => {
		res.send(response.data)
	}).catch(e => {
		res.sendStatus(e.response.status)
		console.error(e)
	})
)

app.listen(port)