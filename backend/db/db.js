const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backery_shop',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log("Base de datos conectada");
    }
})

module.exports = mysqlConnection;