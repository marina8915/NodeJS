var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "myShopList"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query('SELECT * FROM shop_list', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
});

con.end();