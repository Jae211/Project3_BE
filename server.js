const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 8080;

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'lychee',
})

app.use(cors());

app.listen(port, function(req, res) {
	console.log('server run: '+port);
})

app.get("/", function(req, res) {
	var sqlTest = "SELECT user_nickname FROM `USER` WHERE user_id='dlekdud0102'";
	db.query(sqlTest, (err, result) => {
		console.log(result);
		res.send(result);
	})
});

// 검색
app.post('/search', function(req, res) {
	const target = req.body.target;
	var sqlSearch = "SELECT product_title, product_price, product_img FROM `PRODUCT` WHERE product_title='%?%'";
	db.query(sqlSearch, target, (err, result) => {
		if(err) {
			console.log("search error");
			res.send({err: err});
		}
		if (result) {
			console.log(result);
			res.send(result);
		}
	})
})