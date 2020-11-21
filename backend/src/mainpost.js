/********************** REQUIRED MODULES************************************************ */
const mysql = require("mysql");
const Promise = require("bluebird");
const express = require("express");
const cors = require("cors");//POST/GET Data from browser//


/****************************************************************************** */

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

/********************** REQUIRED EXPRESS************************************************ */

const app = express();

app.use(cors());            //POST/GET Data from browser//

app.use(express.json());    //POST Converts text inyo JSON


/********************** REQUIRED ACCESS TO DATABASE************************************************ */
const data_config = {
    host: 'localhost',
    user: 'root',
    password: 'Akshay@1234',
    database: "practo"
}

/********************** POST CALL FOR REG.PAGE************************************************ */

app.post("/reg", async (req, res) => {

    let user = req.body;//body-POST,query-GET

    try {

        await getData(user);

        res.json({ orp: true });
    }
    catch (err) {
        res.json({ orp: false });
    }

});

/********************** POST CALL TO AUTHENTCATE USER************************************************ */
app.post("/auth-user", async (req, res) => {
    try {
        const input = req.body;
        await authenticateUser(input);
        //await sysTime(user);
        res.json({ orp: true });
    }
    catch (err) {
        res.json({ orp: false });
    }
});


/********************** POST CALL TO reset USER************************************************ */
/*app.post("/reset-user", async (req, res) => {
    try {
        const input = req.body;

        authenticateUserReset(input);
        //await sysTime(user);
        res.json({ orp: true });
    }
    catch (err) {
        res.json({ orp: false });
    }
});*/
app.post("/reset-user", async (req, res) => {
    try {
        const input = req.body;
        await authenticateUserReset(input);

        res.json({ orp: true });
    }
    catch (err) {
        res.json({ orp: false });
    }
});
/********************** PORT NUMBER************************************************ */
app.listen(4100);




/********************** REQUIRED METHODS REG.USER************************************************ */
let getData = async (user) => {
    
    const connection = mysql.createConnection(data_config);

    await connection.connectAsync();

    let data = 'insert into user (name,mobile,email,password) values (?,?,?,?)';

    let result = await connection.queryAsync(data, [user.name, user.mobile, user.email, user.password]);
    await connection.endAsync();
    await sysTime(user);

    return result;

}

/********************** REQUIRED METHODS SESSION TIME************************************************ */
let sysTime = async (user) => {
    const connection = mysql.createConnection(data_config);
    await connection.connectAsync();

    let data = 'update user set sessionstart =(select now() from dual) where email=?';

    let r = await connection.queryAsync(data, user.email);
    await connection.endAsync();

    return r;
}



/********************** REQUIRED METHODS Reset user STEP  ************************************************ */
let resetUser = async (user) => {
    const connection = mysql.createConnection(data_config);

    await connection.connectAsync();

    let sql = 'update user set password=? where email=? and mobile=?';
    let r = await connection.queryAsync(sql, [user.password, user.email, user.mobile]);

    await connection.endAsync();



}


/********************** REQUIRED METHODS AUTHENTCATE USER************************************************ */
let authenticateUser = async (input) => {

    let connection = mysql.createConnection(data_config);
    await connection.connectAsync();
    let sql = "select * from user where email=? and password=?";
    const results = await connection.queryAsync(sql, [input.email, input.password,]);
    await connection.endAsync();

    if (results.length === 0) {
        throw new err("Invalid Credentials");
    }

    await sysTime(input);

}

/********************** REQUIRED METHODS AUTHENTCATE USER RESET************************************************ */
let authenticateUserReset = async (input) => {

    let connection = mysql.createConnection(data_config);
    await connection.connectAsync();

    let sql = "select * from user where email=? and mobile=?";
    const results = await connection.queryAsync(sql, [input.email, input.mobile,]);


    await connection.endAsync();

    if (results.length === 0) {
        throw new err("Invalid Credentials");
    }
    else {
        resetUser(input);
    }


}


/********************** REQUIRED METHODS ************************************************ */


