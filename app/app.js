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
	serv = getServiceName(req.body.cpt);
	res.render('results', {
		results: resultArray,
		service: serv
	});	
});
app.post('/schedule', function(req, res) {
	console.log();
});

function getServiceName(cpt) {
	var toReturn;
	switch (cpt) {
		case "76700":
			toReturn = "Abdominal Ultrasound";
			break;
		case "70460":
			toReturn = "Brain CT";
			break;
		case "72157":
			toReturn = "Lumbar Spine MRI";
			break;
		default:
			console.log("Invalid cpt translation");
	}
	return toReturn;
}
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
			console.log("Invalid cpt get");
	}
	for (i = 0; i < 3; i++) {
    	returnList[i].price=(basePrice*(1+.1*(2*Math.random()-1))).toFixed(2);
	}
	return returnList;
}


var server = app.listen(3000, function() {
	console.log('Listening on port 3000');
});