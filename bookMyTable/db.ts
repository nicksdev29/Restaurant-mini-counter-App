import mysql from 'mysql2';
const config = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'book_my_table',
    port: 3306
};

const connection = mysql.createConnection(config);

export default connection;