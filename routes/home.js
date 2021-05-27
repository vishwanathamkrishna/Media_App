const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const iplocate = require("node-iplocate")
const publicIp = require('public-ip')

const axios = require('axios');

 app.use(express.static(__dirname+'/public'));
 app.set('view engine', 'ejs');
 app.set('views', './views/pages');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const News = require('../models/newsModel');


const userloc = async ()=>{
    try{
        const ip = await publicIp.v4()
        console.log("ip : ", ip)
        return await iplocate(ip)    
    }catch(err){
        console.log(err)
    }
}

const getWeather = async (lon, lat) =>{
    const apikey = 'f443d734d889d6c735762b5fedab80b1'
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${apikey}&units=metric`
    console.log("getWeather : apiUrl : ", apiUrl)
    try{
        return await axios.get(apiUrl)
    }catch(err){
        console.log(err)
    }
}


router.get('/home', (req, res) =>{

	userloc().then((loc)=>{  
        const lon = loc.longitude
        const lat = loc.latitude
        console.log(`lon: ${lon}, lat: ${lat}`)

        getWeather(lon,lat).then((response)=>{
            const weather = {
                description: response.data.weather[0].main,
                icon: "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png",
                temperature: response.data.main.temp,
                temp_min: response.data.main.temp_min,
                temp_max: response.data.main.temp_max,
                city: response.data.name
            }
            console.log("weather: ", weather)

            News.find({}).limit(3).sort( {insertTime: -1} ).exec( (err,data)=>{
                console.log(err)
                const newsList = data

                console.log("news : ", newsList)
                res.render('home', {
                    weather,
                    newsList
                })
            })
    
        })
    })
});

router.get('/about', function (req, res) {
	res.render('about', { title: 'About' });
});

router.get('/contactus', function (req, res) {
	res.render('contactus', { title: 'contactus' });
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const request = require('request');
// const News = require ('../models/newsModel');
// const app = express();
// app.use(express.static(__dirname+'/public'));
// app.set('view engine', 'ejs');
// app.set('views', './views/pages');

// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

// function fetchJSON(url) {
// 	return new Promise((resolve, reject) => {
// 	  request(url, function(err, res, body) {
// 		if (err) {
// 		  reject(err);
// 		} else if (res.statusCode !== 200) {
// 		  reject(new Error('Failed with status code ' + res.statusCode));
// 		} else {
// 		  resolve(JSON.parse(body));
// 		}
// 	  });
// 	});
// }

// router.get('/home', (req, res) =>{
// 	req.session.isLoggedIn = false;
// 	console.log('rout:'+req.session.isLoggedIn)
// 	weatherData = fetchJSON('http://localhost:8000/getWeather/weatherwithoutpromise');
// 	var d1,d2 ;
// 	Promise.all([weatherData, weatherData]).then((data) => {
// 		console.log(data)
// 		d1 = data[0];
// 		d2 = data[1];

//        News.find((err, news) => {
// 			if (err) throw err;
// 			news.sort((a,b) => {
// 				return b.publishedOn-a.publishedOn;
// 			})
// 			news = news.slice(0,3) ;
// 			res.render('home', { newsList: news, result: d1, data_two: d2 });
// 		});
//       }).catch(err => console.error('There was a problem', err));
	 
//     //res.render('home');
// });






// // 		res.render("home", {
// // 		  result: data[0],
// // 		  data_two: data[1]
// // 		});
// // 	  }).catch(err => console.error('There was a problem', err));
// // 	//res.render('home');
// // });


// module.exports = router;