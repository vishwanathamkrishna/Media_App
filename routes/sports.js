const express = require('express');
const News = require('../models/newsModel');
const router = express.Router();


// router.get('/', (req, res) =>{
// 	res.render('sports.ejs');
// });

router.get('/', (req, res) => {
    News.find((err, news) => {
        if (err)
            throw err;

        //res.json(users);
		// console.log('news: ' + news);
        res.render('sports', { newsList: news });
    });
});


module.exports = router;