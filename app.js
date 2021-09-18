let express = require('express');
let Fs = require('fs');
let path = require('path');
let URL = require('url');
let app = express();
let router = express.Router();

const port = 2020;

app.use(express.static('Programs'));
app.use('/', router);

router.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname+'/views/UiOfServer.html'));
});

// router.get('/todo/download' , (req, res) => {
//     res.send("download page");
// });

// router.get('/todo/upload' , (req, res) => {
//     res.send("upload page");
// });

// router.post('/todo/download' , (req, res) => {
//     console.log("download page");
//     res.end("done");
// });

// router.post('/todo/upload' , (req, res) => {
//     console.log("upload page");
//     res.end("done");
// });

app.post('/receive', function(request, respond) {
    var body = '';
    filePath = __dirname + '/Tempdata.txt';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        Fs.appendFile(filePath, body, function() {
            respond.end();
        });
    });
});

app.listen(port, (err, res) => {
    if(err){
        console.log(`Server Error: ${err}`);
    }
    else{
        console.log(`server started on ${port}`);
    }
})