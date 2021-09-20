// import * as FileMangement from "./FileSystem.js";
let express = require('express');
let Fs = require('fs');
let path = require('path');
let URL = require('url');
var opn = require('opn');
let app = express();
let router = express.Router();

const port = 2020;

app.use(express.static('Programs'));
app.use('/', router);

app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname+'/views/UiOfServer.html'));
});

app.post('/download/:data', (req, res) => {
    let data = req.params.data;
    data = data.slice(1, data.length);
    WriteDB(data, "DB"); //username here is just one name but in step 5 enchanced it.
    res.redirect('/Todo');
});

app.post('/upload', (req, res) => {
    let data = ReadDB("DB"); //username here is just one name(DB) but in step 5 enchanced it.
    
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

app.listen(port, (err, res) => {
    if(err){
        console.log(`Server Error: ${err}`);
    }
    else{
        console.log(`server started on ${port}`);
    }
})