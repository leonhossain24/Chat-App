// IMPORTING LIBRARIES ///////////////////////////////////////

var express = require('express');
var socket = require('socket.io');


// SETTING UP DB //////////////////////////////////////
var db;
var db_url = "mongodb://"+process.env.IP+":27017"

var mongoose = require("mongoose");

mongoose.connect(db_url+"/node-cw9");
mongoose.connection.on('error', function(err){
  console.log(err);
  console.log('Could not connect to mongodb');
});



// DEFINING DB MODELS / SCHEMA //////////////
var Schema = mongoose.Schema;

var textSchema = new Schema({
  handle: {
    type: String,
    required: "Handle required"
  },
  message: {
    type: String
  },
  
  
  session :  [{ type: Schema.Types.ObjectId, ref: 'Session' }]
  // MANY TO ONE RELATION WITH SESSION
});

var SessionSchemavar  = new Schema({
  messages :  [{ type: Schema.Types.ObjectId, ref: 'Text' }]
  
  
  
});


// INSTANTIATING MODEL TO USE MONGOOSE API
var Text = mongoose.model('Text', textSchema)


// App setup FOR CHAT
var app = express();
var server = app.listen(process.env.PORT , process.env.IP,   function(){
    console.log('listening for requests on port ' + process.env.PORT + '!');
});

// Static files TO RENDER PAGES
app.use(express.static('public'));


// BODYPARSER FOR HANDLING DATA
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// DUMMY MESSAGE LIST FOR TESTING PURPOSES
var message_lst = [];

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
        
        
//////  // SAVING CHAT DATA TO DATABASE /////////////
        var new_text = new Text(request.body);
        
        new_text.session = localStorage.getItem('session');
        
  new_text.save(function(err, data){
    if(err)
      return response.status(400)
                    .json({error: "Please add a handle and message"});
    console.log(data);
    return response.status(200)
                    .json({message: "Text successfully saved"});
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});



// GETTING LIST OF MESSAGES FROM 1 SESSION ////////////
app.get('/message/list', function(request, response){
  return response.status(200).json({message_lst: message_lst});
})