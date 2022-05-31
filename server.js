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
app.use(express.json());

app.listen(port, function(req, res) {
	console.log('server run: '+port);
})

app.post('/', function(req, res){
	
})

/*
 * 목적 : 아이디 찾기
 * input : name, phone
 * output : user id / "아이디 정보가 존재하지 않습니다!"
 */
app.post('/findid', function(req, res) {
    const name = req.body.name;
    const phone = req.body.phone;

    db.query("SELECT * FROM user WHERE user_name = ? AND user_phone = ?", 
    [name, phone],
    (err, result) => {
        if(err){
            console.log("findid error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("findid succeed!");            
            res.send(result);
        } else{
            console.log("findid fail");
            res.send({message: "아이디 정보가 존재하지 않습니다!"});
        }
    });
});