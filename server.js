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
 * 목적 : 내 정보 불러오기
 * input : id
 * output : user 정보 / null
 */
app.post('/getmyinfo', function(req, res) {
    const id = req.body.id;

    db.query("SELECT * FROM user WHERE user_id = ?", 
    [id],
    (err, result) => {
        if(err){
            console.log("getmyinfo error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("getmyinfo succeed!");            
            res.send(result);
        } else{
            console.log("getmyinfo fail");
            res.send({message: "정보가 존재하지 않습니다!"});
        }
    });
});


/*
 * 목적 : 내 정보 변경하기
 * input : id
 * output : user 정보 / null
 */
app.post('/changemyinfo', function(req, res) {
    const id = req.body.id;
    const pw = req.body.pw;
    const nickname = req.body.nickname;
    const location = req.body.location;
    
    db.query("UPDATE user SET user_pwd = ?, user_nickname = ?, user_location = ? WHERE user_id = ?",
    [pw, nickname, location, id],
    (err, result) => {
        if(err){
            console.log("changemyinfo error");
            res.send({message: "실패"});
        }
        if(result){
            console.log("changemyinfo succeed!");
            res.send({message: "성공"});
        }
    });
});



/*
 * 목적 : nickname 중복 확인
 * input : nickname
 * output : user 정보 / null
 */
app.post('/nickoverlap', function(req, res) {
    const nickname = req.body.nickname;

    db.query("SELECT * FROM user WHERE user_nickname = ?", 
    [nickname],
    (err, result) => {
        if(err){
            console.log("nickoverlap error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("nickoverlap succeed!");            
            res.send({message: "이미 존재하는 닉네임입니다!"});
        } else{
            console.log("nickoverlap fail");
            res.send();
        }
    });
});