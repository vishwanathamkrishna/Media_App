const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');
app.set('views', './views/pages');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) =>{
	res.render('editNews');
});



module.exports = router;