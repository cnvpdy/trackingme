const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


function mysqlDb(sql) {
    //mysql
    let resultArray = [];
    const mysql = require('mysql'); // mysql 모듈 로드
    const conn = { // mysql 접속 설정
        host: '1.221.61.36',
        port: '3307',
        user: 'CNV',
        password: 'ausRhdrks2!!',
        database: 'costdb'
    };

    let connection = mysql.createConnection(conn); // DB 커넥션 생성
    connection.connect(); // DB 접속

    connection.query(sql, function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        resultArray = results;
    });
    return resultArray
    connection.end(); // DB 접속 종료
    // mysql

}

app.listen(8080, function () {
    console.log('listening on 8080')
})
app.get('/beauty', function (요청, 응답) {
    응답.send('뷰티용품을 쇼핑할 수 있는 페이지입니다.');
});
app.get('/', function (요청, 응답) {
    응답.sendFile(__dirname + '/index.html');
});
app.get('/write', function (요청, 응답) {
    응답.sendFile(__dirname + '/write.html');
});

app.post('/add', function (요청, 응답) {
    응답.send('전송완료');
    console.log(요청.body);
    let title = 요청.body.title;
    let date = 요청.body.date;
    mysqlDb("INSERT todoapp.post VALUES ('" + title + "','" + date + "');");
});

app.get('/list', function(요청, 응답){
    

    
    const mysql = require('mysql'); // mysql 모듈 로드
    const conn = { // mysql 접속 설정
        host: '1.221.61.36',
        port: '3307',
        user: 'CNV',
        password: 'ausRhdrks2!!',
        database: 'costdb'
    };

    let connection = mysql.createConnection(conn); // DB 커넥션 생성
    connection.connect(); // DB 접속
    
    connection.query("SELECT * FROM todoapp.post;", function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        응답.render('list.ejs',{posts : results});
    });
    connection.end(); // DB 접속 종료
    
    
})