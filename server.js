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
 * 목적 : 로그인
 * input : id, pw
 * output : user에 대한 정보 / "아이디 또는 비밀번호가 틀렸습니다!"
 */
app.post('/login', function(req, res) {
    const id = req.body.id;
    const pw = req.body.pw;

    db.query("SELECT * FROM user WHERE user_id = ? AND user_pwd = ?", 
    [id, pw],
    (err, result) => {
        if(err){
            console.log("login error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("login succeed!");
            res.send(result);
        } else{
            console.log("login fail");
            res.send({message: "아이디 또는 비밀번호가 틀렸습니다!"});
        }
    });
});