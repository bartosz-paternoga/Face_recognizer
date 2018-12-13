
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const mime = require('mime-types');


const port = process.env.PORT || 3001;

const app = express();
app.use(express.static('client/build'));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RECOGNIZER');
const {Mong} = require('./model');




app.post('/api/datapost', async (request, response) => {
  postBody = await request.body;

  const x = JSON.stringify(postBody);
  console.log("POSTBODY", x)

  const y =  x.substring(2, x.indexOf(','))

  console.log("yyyyyyyyyy", y)

  const x1 =  x.substring(y.length+3, x.length-5)

  const mong = new Mong ({
         Name: y,
         Bucket: [x1],
      });

  mong.save((err,doc)=>{
      if(err) console.error(err)
      console.log(doc)
      // mongoose.disconnect()
   })


  response.send(postBody);

});


app.post('/api/dataremove', async (request, response) => {
  postBody = await request.body;

  const x = JSON.stringify(postBody);
  console.log("POSTBODY", x)

  const y =  x.replace(/"|:|{|}/g,'')

  console.log("y", y)

Mong.findOneAndRemove({Name:y},(err,doc)=>{
     if(err) return console.log(err);
     console.log(doc)
})


  response.send(postBody);

});


app.post('/api/dataRemoveAll', async (request, response) => {
  
  Mong.remove({},(err,doc)=>{
      if(err) return console.log(err);
      console.log(doc)
  })

    response.send("all removed");

});



app.get('/api/data', function(req, res) {
  Mong.find({},{_id: 0, __v:0}, function(err, foundData) { //empty query for all data
      if(err) {
         console.log(err);
         return res.status(500).send();
      } else {
          // console.log("FOUNDDATA",foundData)
          res.status(200).send(foundData);
      }
  });
});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}`)) 
