const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/chinook.db');

let query = 'select * from employees';

app.get('/', (req, res) => {
	res.redirect('http://localhost:3000/');
});


app.get('/employees', cors(), (req, res) => {
	let successMessage, failureMessage;
	successMessage = 'success!';
	failureMessage = 'something went wrong';

	db.all(query, (err, row) => {
		try {
			res.send(row);
		} catch (error) {
			console.error(failureMessage, error);
		}
	})
})

app.get('/employees/:id', cors(), (req, res) => {

	// Maybe write a function for this so its not hardcoded
	// as the api may change in the future
	let _id = req.orginalUrl.split('/')[2];

	db.all(query, (err, row) => {
		try {
			let singleEmployee = row.filter(employee = {
				return employee.EmployeeId == _id
			});
			res.json(singleEmployee);
			console.log(successMessage);
		} catch(error) {
			console.log(failureMessage, error);

		}
	});
});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
