let express = require('express');
let fs = require('fs');
let path = require('path');
let app = express();
let router = express.Router();

const port = 2020;

app.use(express.static('Programs'));
app.use('/', router);

router.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname+'/views/UiOfServer.html'));
});

app.listen(port, (err, res) => {
    if(err){
        console.log(`Server Error: ${err}`);
    }
    else{
        console.log(`server started on ${port}`);
    }
})