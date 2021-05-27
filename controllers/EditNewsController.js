const express = require('express');
const router = express.Router();


const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


const Query = require('../models/contactus');


const app = express();
app.set('view engine', 'ejs');
app.set('views', './views/pages');
app.use(express.static(__dirname+'/public'));


