// var form = $('form').serializeArray();

// console.log(form);
// var handle = $('handle');



// SAVING USERNAME AND CHAT NAME USING LOCAL STORAGE

var $handle = $('#handle');
var $session = $('#session');

var handle1 = NaN;
// var eml = NaN;
// var cmnt = NaN;
// var prc = NaN;
// var bll = NaN;
// var rtn = NaN;
// var frm = NaN;





function send() {
    console.log('Testing!');


    var handle1 = $handle.val();
    var session1 = $session.val();
    


    

    localStorage.setItem('handle', handle1);
    localStorage.setItem('session', session1);


    // console.log('Before');
    // var bs =  localStorage.getItem('name_val');
    // console.log(bs);
    // console.log('After');

    window.location.assign("index.html");
  }


// TAKING HANDLE AND SESSION NAME FROM LOCAL STORAGE AND DISPLAYING ON CHAT INTERFACE
var handle1 =  localStorage.getItem('handle');
var session1 = localStorage.getItem('session');

$('#handle').append(handle1);

$('#session_name').append(session1);



// TIME OUT CHAT AFTER 15 MINS, CLEAR CHAT WINDOW 
// USING TARGETTED JS DOM MANUPILATION
setTimeout(function(){ $('#chat-window').empty(); }, 900000);