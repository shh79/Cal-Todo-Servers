// var Fs = require('fs');
class file{
    constructor(){
        
    }

    ReadDB = (username) => {
        let result='';
        let adderss = `../Database/${username}.txt`;
        Fs.readFile(adderss, (err, Data) => {
            if(err) throw err;
    
            result = Data;
            console.log("Todos uploaded successfully");
        });
        return result;
    }
    
    WriteDB = (result, username) => {
        let adderss = `../Database/${username}.txt`;
        Fs.appendFile(adderss, result, (err) => {
            if(err) throw err;
    
            console.log("Todos downloaded to database successfully");
        })
    }
}