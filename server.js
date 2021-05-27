const express = require('express');
const app = require('./app');
const path = require('path');
const session = require('express-session');
const addNews = require('./routes/addNews');
// const editNews = require('./routes/editNews');
const sports = require('./routes/sports');
const contactController = require('./controllers/ContactController');
const dataNews = require('./routes/admin-routes/dataNews');

// const log = require('./controllers/AdminController');
/****************************** CHAT *******************************/
const http = require('http').Server(app);
const io = require('socket.io')(http);
/****************************** CHAT *******************************/
app.use(session({secret: 'edurekaSecert'}));
app.use('/addNews' , addNews);
// app.use('/editNews' , editNews);
app.use(express.json());
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.set('views', ['./views/pages','./views/adminView']);
app.use('/dataNews',dataNews);
app.use('/sports' , sports);

// app.use(session({
//   secret: 'edurekaSecret',
//   resave: false,
//   saveUninitialized: true
// }));

let sess;

// app.use((req,res,next) => {
//     res.locals.isAuthenticated = req.session.isLoggedIn;
//     console.log('app:'+req.session.isLoggedIn)
//     next();
// });

app.get('/',(req,res) => {
    sess=req.session;
    sess.email=" "
    console.log(">>>>",sess.email);
    res.render('signin',{error: req.query.valid?req.query.valid:'',
                        msg: req.query.msg?req.query.msg:''})
})
// app.get('/',(req,res) => {
//     sess=req.session;
//     sess.email=" "

//     res.render('signin',
//       { invalid: req.query.invalid?req.query.invalid:'',
//         msg: req.query.msg?req.query.msg:''})
// })

app.post('/api/addContactUs', (req,res)=>{
  
    console.log("/api/addContactUs : req.body : ", req.body)
    const record = req.body
    Contactuslist.create(
                record  
              , (err, data) => {
                  if(err) return res.status(500).send('There was a problem registering user')
                  console.log(`Inserted ... ${data} `)
                  return res.status(200).send("Inserted")
              }) 
  })

const WeatherController = require('./controllers/WeatherController');

app.use('/contactus', contactController);

app.use('/getWeather', WeatherController);
const home = require('./routes/home');

app.use('/', home);

// app.use('/editNews', AdminController);

const port = process.env.PORT || 8000;

/****************************** CHAT *******************************/
http.listen(port, (err) => {
	if (err)
		throw err;
	console.log(`Listening on port ${port}...`);
});

// Event handler that is emitted when client connects.
io.on('connection', (socket) => {
    console.log('A client has connected to the server!');

    // Event handler that is emitted when a message is sent.
    socket.on('msg', (data) => {
        // Send a new message to everyone in the chat room.
        io.sockets.emit('newmsg', data);
    });

    // Event handler that is emitted when client is disconnected.
    socket.on('disconnect', () => {
        console.log('A client has disconnected from the server!');
    });
});
/****************************** CHAT *******************************/
