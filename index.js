// server.js

const express = require('express');
const app = express();
// const mongoose = require('mongoose');
// // const routes = require('./server_src/routes');
// var bodyParser = require('body-parser');

// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + '/dist/wastexchange-fe'));

// Start the app by listening on the default
// Heroku port

app.listen(process.env.PORT || 8080);
console.log('app is listening to 8080 port now..');
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/*DB Connection using moongoose*/
// mongoose.connect('mongodb://subbudb1:subbudb1@ds133547.mlab.com:33547/subbu-work', { useMongoClient: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   // we're connected!
//   console.log('Voila, you are connected to the database...');
// });

// /*Define routes to handle all incoming routes*/
// routes(app);
