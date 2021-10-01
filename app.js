let express = require('express');
let Fs = require('fs');
let path = require('path');
let URL = require('url');
var opn = require('opn');
const { json } = require('express');
const { count } = require('console');
let app = express();
let router = express.Router();

const port = 2020;
const DatabaseAddress = __dirname + `\\Programs\\Todo\\Database\\UserDatabase.json`;
let OpenedUser = null;

app.set('view engine', 'ejs');

app.use(express.static('Programs'));
app.use('/', router);

app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname+'/views/UiOfServer.html'));
});

app.get('/Login', (req, res) => {
    // res.sendFile(path.join(__dirname+'/views/LoginPage.ejs'))
    res.render(path.join(__dirname+'/views/LoginPage.ejs'), {temp: ''});
});

app.post('/download/:data', (req, res) => {
    let data = req.params.data;
    data = data.slice(1, data.length);
    WriteDB(data, OpenedUser); //username here is just one name but in step 5 enchanced it. Done now
    res.redirect('/Todo');
});

app.post('/upload', (req, res) => {
    let data = ReadDB(OpenedUser); //username here is just one name(DB) but in step 5 enchanced it. Done now
    
    const format = `
    <h1>Uploaded Successfully</h1>
    <p>if you sure for upload todos from database to your list click on <b>OK</b> button then click on <b>Redirect</b> to coming back to list.</p>
    <div style='display: flex; flex-direction: row;'>
    <button id='OKBTN'>OK</button>
    <form action='/todo' style='height: 100%;'>
        <button type='submit'>Redirect</button>
    </form>
    </div>
    <p style='display: none;' id='recivedData'>${data}</p>
    <script>
        document.querySelector('#OKBTN').addEventListener('click', () => {
            localStorage.setItem('0', document.querySelector('#recivedData').innerText);
        });
    </script>
    `;

    res.send(format);
});

app.post('/SignIn/:data', (req, res) => {
    let data = req.params.data;
    data = data.slice(1, data.length);
    data = data.split(',');

    let username = data[0], pass = data[1];
    username = username.toLowerCase();

    console.log(username, pass);
    
    let result = ConfirmValidation(username, pass);

    console.log(result);

    if(result.result){
        OpenedUser = username;
    }
    else{
        
    }

    res.render(path.join(__dirname+'/views/LoginPage.ejs'), {temp: 'hello'});

});

app.post('/SignUp/:data', (req, res, next) => {
    let data = req.params.data;
    data = data.slice(1, data.length);
    data = data.split(',');

    let username = data[0], pass = data[1], rePass = data[2];
    username = username.toLowerCase();

    console.log(username, pass, rePass);

    let result = AddNewUser(username, pass, rePass);

    console.log(result);

    res.redirect('/');
    next();
});

ReadDB = (username) => {
    let result='';
    let adderss = __dirname + `\\Programs\\Todo\\Database\\${username}.txt`;
    
    result = Fs.readFileSync(adderss);
    console.log("Todos uploaded from database successfully");
    return result;
}
    
WriteDB = (result, username) => {
    let adderss = __dirname + `\\Programs\\Todo\\Database\\${username}.txt`;
    Fs.writeFile(adderss, result, (err) => {
        if(err) throw err;
    
        console.log("Todos downloaded to database successfully");
    });
}

AddNewUser = (username, password, rePassword) => {
    let Database = Fs.readFileSync(DatabaseAddress, {encoding:'utf8', flag:'r'});
    let obj = JSON.parse(Database);

    if(password != rePassword){
        return {result : false, alert : 'Password and repassword is not match.'};
    }

    if(obj[username] == undefined){
        if(IsPoweredPass(password)){
            obj[username] = {pass : password};
        }
        else{
            return {result : false, alert : 'This password is so weak.'};
        }
    }
    else{
        return {result : false, alert : 'This username is already exist.'};
    }

    Fs.writeFile(DatabaseAddress, JSON.stringify(obj), (err) => {
        if(err){
            throw err;
        }
        console.log("New user is added.");
    });

    WriteDB('null', username);

    return {result : true, alert : 'Sign up proccess is successfully .'};
}

ConfirmValidation = (username, password) => {
    let Database = Fs.readFileSync(DatabaseAddress, {encoding:'utf8', flag:'r'});
    let obj = JSON.parse(Database);

    if(obj[username] != undefined){
        if(password == obj[username].pass){
            return {result : true, alert : 'Confirmed'};
        }
        else{
            return {result : false, alert : 'Password is incorrect.'};
        }
    }
    else{
        return {result : false, alert : 'This username is not exist.'};
    }
}

IsPoweredPass = (pass) => {
    if(pass.length < 8){
        return false;
    }

    let tempPass = pass.match(/(\d+)/);
    if(!tempPass){
        return false;
    }

    if(pass.length == tempPass[0].length){
        return false;
    }

    return true;
}

app.listen(port, (err, res) => {
    if(err){
        console.log(`Server Error: ${err}`);
    }
    else{
        console.log(`server started on ${port}`);
    }
});