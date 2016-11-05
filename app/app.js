var express = require('express');
var app = express();
var request = require('request');
var datafile = require('./data/data.json');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('home');
});
app.set('view engine', 'ejs');
app.post('/search', function(req, res) {
	resultArray = getProviderList(req.body.cpt, req.body.insurance, req.body.zipcode);
	res.render('results', {
		results: resultArray
	});	
});



var options = {
  url: 'https://platform.pokitdok.com/api/v4/providers/?zipcode=30332',
  headers: {
    'Authorization': 'Bearer PefJGRb22ASqMr9WgtTfOZN2BYOaPA0vzWrRtnmw'
  }
};

function getAveragePrice(cpt, insurance, zipcode) {
	var base;
	var insurPrices = datafile.insurancePricesByCPT[cpt];
	switch(insurance) {
		case "medicare":
			base = datafile.medicarePricesByCPT[cpt];
			base = base*(1+(.1*((2*Math.random())-1)));
			break;
		case "medicaid":
			base = datafile.insurancePricesByCPT[cpt];
			base = base*(0.6+(.1*((2*Math.random())-1)));
			break;
		case "aetna":
			base = insurPrices*(1.1+(.1*((2*Math.random())-1)));
			break;
		case "bcbs":
			base = insurPrices*(1.1+(.1*((2*Math.random())-1)));
			break;
		case "united":
			base = insurPrices*(1.1+(.1*((2*Math.random())-1)));
			break;
		default:
			console.log("Invalid Insurance");
			return;
	}
	return base;
}


function getProviderList(cpt, insurance, zipcode) {
	var basePrice = getAveragePrice(cpt, insurance, zipcode);
	var providerList = datafile.providers;
	var returnList = [];
	console.log("cpt:" + cpt + "insurance:" + insurance + "zipcode:" + zipcode);
	switch(cpt) {
		case "76700":
			returnList.push(providerList[1]);
			returnList.push(providerList[3]);
			returnList.push(providerList[5]);
			break;
		case "70460":
			returnList.push(providerList[2]);
			returnList.push(providerList[4]);
			returnList.push(providerList[6]);
			break;
		case "72157":
			returnList.push(providerList[0]);
			returnList.push(providerList[7]);
			returnList.push(providerList[8]);
			break;
		default:
			console.log("Invalid cpt");
	}
	for (i = 0; i < 3; i++) {
    	returnList[i].price=basePrice*(1+.1*(2*Math.random()-1));
    	console.log(returnList[i]);
	}
	return returnList;
}

//var output = getProviderList("76700", "medicare", 30324);

// function callback(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     var info = JSON.parse(body);
//     console.log(info.data);
//   }
// }
 
// request(options, callback);
	
var server = app.listen(3000, function() {
	console.log('Listening on port 3000');
});