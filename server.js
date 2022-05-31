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
 * 목적 : 비밀번호 찾기
 * input : id, name, phone
 * output : user pw / "사용자 정보가 존재하지 않습니다!"
 */
app.post('/findpw', function(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const phone = req.body.phone;

    db.query("SELECT * FROM user WHERE user_id = ? AND user_name = ? AND user_phone = ?", 
    [id, name, phone],
    (err, result) => {
        if(err){
            console.log("findpw error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("findpw succeed!");            
            res.send(result);
        } else{
            console.log("findpw fail");
            res.send({message: "사용자 정보가 존재하지 않습니다!"});
        }
    });
});