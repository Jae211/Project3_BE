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
 * 목적 : 회원가입
 * input : id, name, date, nickname, pw, phone, location
 * output : user 정보 / null
 */
app.post('/register', function(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const date = req.body.date;
    const nickname = req.body.nickname;
    const pw = req.body.pw;
    const phone = req.body.phone;
    const location = req.body.location;

    console.log("info : "+id+"\n"+name+"\n"+date+"\n"+nickname+"\n"+pw+"\n"+phone+"\n"+location);

    db.query("INSERT INTO USER (user_id, user_name, join_date, user_nickname, user_pwd, user_phone, user_location) VALUES (?,?,?,?,?,?,?)", 
    [id, name, date, nickname, pw, phone, location],
    (err, result) => {
        if(err){
            console.log("register error");
            res.send({message: "실패"});
        }
        if(result){
            console.log("register succeed!");
            res.send({message: "성공"});
        }
    });
});

/*
 * 목적 : id 중복 확인
 * input : id
 * output : user 정보 / null
 */
app.post('/idoverlap', function(req, res) {
    const id = req.body.id;

    db.query("SELECT * FROM user WHERE user_id = ?", 
    [id],
    (err, result) => {
        if(err){
            console.log("idoverlap error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("idoverlap succeed!");            
            res.send(result);
        } else{
            console.log("idoverlap fail");
            res.send();
        }
    });
});


/*
 * 목적 : phone 중복 확인
 * input : phone
 * output : user 정보 / null
 */
app.post('/phoneoverlap', function(req, res) {
    const phone = req.body.phone;

    db.query("SELECT * FROM user WHERE user_phone = ?", 
    [phone],
    (err, result) => {
        if(err){
            console.log("phoneoverlap error");
            res.send({err: err})
        }
        if(result.length > 0){
            console.log("phoneoverlap succeed!");            
            res.send(result);
        } else{
            console.log("phoneoverlap fail");
            res.send();
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
            res.send(result);
        } else{
            console.log("nickoverlap fail");
            res.send();
        }
    });
});

