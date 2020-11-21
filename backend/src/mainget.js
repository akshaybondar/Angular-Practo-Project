const mysql = require("mysql");
const Promise = require("bluebird");
const express = require("express");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const app = express();

const data_config = {
    host: 'localhost',
    user: 'root',
    password: 'Akshay@1234',
    database: "pract"
}


app.get("/akshay", async (req, res) => {

    let user = req.query;

    await getData(user);
    res.json("data added success");
});
//http://localhost:4000/akshay?id=001&name=babubhai
app.listen(4000);

let getData = async (user) => {
    const connection = mysql.createConnection(data_config);
    await connection.connectAsync();

    let data = 'insert into person (id,name) values (?,?)';
    let result = await connection.queryAsync(data, [user.id, user.name]);
    console.log(result);
    await connection.endAsync();
    return;
}

/*
    steps to create server

--->    folder open
--->    npm init
--->    npm i mysql,express,bluebird,cors
--->    node src/main.js


*/