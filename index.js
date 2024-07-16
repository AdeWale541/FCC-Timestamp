// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const findTimestamp= async(req, res)=>{

  const {date}= req.params;

  const dateConstructor = new Date()

if(!date){
  dateInt = parseInt(date)
     res.status(200).json({
      unix: dateConstructor.getTime(), // Converts js timestamp to unix
      utc: dateConstructor.toUTCString() // Gets 
     }) 
}

else if(/^[0-9]*$/.test(Number(date))){
 let newDate= Number(date)
  res.status(200).json({
   unix: newDate, 
   utc: new Date(newDate).toUTCString()
  }) 
  }

  else if(/^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/.test(date)){
      res.status(200).json({
       unix: new Date(date).getTime(), 
       utc: new Date(date).toUTCString()
      }) 
      }

    else if  (new Date(date) != "Invalid Date" ){
      console.log(date);
      res.status(200).json({
        unix: new Date(date).getTime(), 
        utc: new Date(date).toUTCString()
       }) 
      
     }
      else{ // Find out why the error has to be in  an else block
      console.log(date);
        res.status(400).json({ error : "Invalid Date" })
      }
}

module.exports={findTimestamp}
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api", findTimestamp);

app.get("/api/:date", findTimestamp);


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
