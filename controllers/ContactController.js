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



router.post('/', (req,res) => {           
            const query = new Query({...req.body })
            
            query.save(
                (err, data) => {
                if(err) return res.status(500).send('There was a problem adding news')
                console.log(`Inserted ... ${data} `)
                res.redirect('/contactus');
            })            
});

module.exports = router