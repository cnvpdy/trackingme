const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

function guid() {
    function s4() {
        return Math
            .floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() +
            s4();
}

function mysqlDb(sql) {
    //mysql
    let resultArray = [];
    const mysql = require('mysql'); // mysql 모듈 로드
    const conn = { // mysql 접속 설정
        host: '1.221.61.36',
        port: '3307',
        user: 'CNV',
        password: 'ausRhdrks2!!',
        database: 'trackingme'
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
    응답.sendFile(__dirname + '/process.html');
    console.log(요청.body);
    let id = guid();
    let div = 요청.body.div;
    let cate = 요청.body.cate;
    let startDate = 요청.body.startDate;
    let startTime = 요청.body.startTime;
    let endDate = 요청.body.endDate;
    let endTime = 요청.body.endTime;
    let partyPeople = 요청.body.partyPeople;
    let title = 요청.body.title;
    let inputNumber = 요청.body.inputNumber;
    let inputLocation = 요청.body.inputLocation;
    let inputTool = 요청.body.inputTool;
    let inputPurpose = 요청.body.inputPurpose;
    let inputCost = 요청.body.inputCost;
    let inputCostBase = 요청.body.inputCostBase;

    let inputReturn = 요청.body.inputReturn;
    let inputReturnBase = 요청.body.inputReturnBase;
    let inputRef = 요청.body.inputRef;

    let item = 요청.body.item;
    let spec = 요청.body.spec;
    let unit = 요청.body.unit;
    let quantity = 요청.body.quantity;

    let perCostMaterial = 요청.body.perCostMaterial;
    let perCostHuman = 요청.body.perCostHuman;
    let perCostEtc = 요청.body.perCostEtc;
    let perCostTotal = 요청.body.perCostTotal;

    console.log(
        "INSERT trackingme.raw VALUES ('" + div + "','" + cate + "','" + startDate + "'" +
        ",'" + startTime + "','" + endDate + "','" + endTime + "','" +
        partyPeople + "','" + title + "','" + inputNumber + "','" +
        inputLocation + "','" + inputTool + "','" + inputPurpose + "','" +
        inputCost + "','" + inputCostBase + "','" + inputReturn + "','" +
        inputReturnBase + "','" + inputRef + "','" + id + "','" + item + "','" + spec +
        "','" + unit + "','" + quantity + "','" + perCostMaterial + "','" +
        perCostHuman + "','" + perCostEtc + "','" + perCostTotal + "');"
    );
    mysqlDb(
        "INSERT trackingme.raw VALUES ('" + div + "','" + cate + "','" + startDate + "'" +
        ",'" + startTime + "','" + endDate + "','" + endTime + "','" +
        partyPeople + "','" + title + "','" + inputNumber + "','" +
        inputLocation + "','" + inputTool + "','" + inputPurpose + "','" +
        inputCost + "','" + inputCostBase + "','" + inputReturn + "','" +
        inputReturnBase + "','" + inputRef + "','" + id + "','" + item + "','" + spec +
        "','" + unit + "','" + quantity + "','" + perCostMaterial + "','" +
        perCostHuman + "','" + perCostEtc + "','" + perCostTotal + "');"
    );

  
});

app.get('/list', function (요청, 응답) {

    const mysql = require('mysql'); // mysql 모듈 로드
    const conn = { // mysql 접속 설정
        host: '1.221.61.36',
        port: '3307',
        user: 'CNV',
        password: 'ausRhdrks2!!',
        database: 'trackingme'
    };

    let connection = mysql.createConnection(conn); // DB 커넥션 생성
    connection.connect(); // DB 접속

    connection.query(
        "SELECT * FROM trackingme.raw;",
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log(results);
            응답.render('list.ejs', {posts: results});
        }
    );
    connection.end(); // DB 접속 종료

})