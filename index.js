const express     = require("express");
const mercadopago = require("mercadopago");
// const fs          = require('fs');
const config      = require("./config.js");
const app         = express();
var appPort       = process.env.PORT || 3000;

/**
* configure
*/
mercadopago.configure({
	access_token : config.api.accessToken,
	integrator_id: config.api.integratorId
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("../../client"));

app.get("/", function (req, res) {
  res.status(200).sendFile("front/index.html", { root: __dirname });
}); 

app.get("/resume", function (req, res) {
  res.status(200).sendFile("front/resume.html", { root: __dirname });
}); 

app.get("/success", function (req, res) {
  res.status(200).sendFile("front/responses.html", { root: __dirname });
}); 

app.get("/failure", function (req, res) {
  res.status(200).sendFile("front/responses.html", { root: __dirname });
}); 

app.get("/pending", function (req, res) {
  res.status(200).sendFile("front/responses.html", { root: __dirname });
});

app.post("/notification", function (req, res, body) {
  console.log("Respuesta Notificacion: ");
  console.log(body);
  console.log(res.body);
  res.send('POST request to the homepage');
  //console.log("ruta notificacion: ", __dirname + "/notification.txt");
  //fs.writeFile( __dirname + "/notification.txt", data);
}); 

/*app.get("/notification", function (req, res) {
  return res.status(200).sendFile("notification.txt", { root: __dirname });
});*/

app.get("/imageProduct", function (req, res) {
  return res.status(200).sendFile("front/assets/images/mrcLibre.JPG", { root: __dirname });
}); 

app.get("/jsBase", function (req, res) {
  return res.status(200).sendFile("front/assets/js/index.js", { root: __dirname });
});

app.get("/jsResume", function (req, res) {
  return res.status(200).sendFile("front/assets/js/resume.js", { root: __dirname });
});

app.get("/jsResponse", function (req, res) {
  return res.status(200).sendFile("front/assets/js/responses.js", { root: __dirname });
});

app.post("/create_preference", (req, res) => {
	let defResponse = {};
	let preference  = {
		payer: {
			name: "Lalo",
			surname: "Landa",
			email: "test_user_83958037@testuser.com",
			phone: {
				area_code: "52",
				number: 5549737300
			},
			address: {
				zip_code: "03940",
				street_name: "Insurgentes Sur",
				street_number: 1602
			}
		},
		items: [{
			id: "1234",
			title: req.body.title,
			description: "Dispositivo móvil de Tienda e-commerce",
			picture_url: req.body.baseUrl+req.body.image,			
			unit_price: Number(req.body.price),
			quantity: Number(req.body.quantity),
		}],
		back_urls: {
			"success": req.body.baseUrl+"success",
			"failure": req.body.baseUrl+"failure",
			"pending": req.body.baseUrl+"pending"
		},
		payment_methods: {
			"excluded_payment_methods": [
		    	{
		    		"id": "amex"
		    	}
		    ],
		    "excluded_payment_types": [
		    	{
		    		"id": "atm"
		    	}
		    ],
			installments: 6
		},
		notification_url: req.body.baseUrl+"notification",
		external_reference: "helacer3@yahoo.es",
		auto_return: 'approved',
	};

	// console.log(preference);

	mercadopago.preferences.create(preference)
		.then(function (response) {
			defResponse = res.json(response)
		}).catch(function (error) {
			console.log(error);
		});

	// default Return
	return defResponse;
});


/*app.get('/success', function(request, response) {
	response.json({
		Payment: request.query.collection_id,
		Status: request.query.collection_status,
		ExternalReference: request.query.external_reference,
		PaymentType: request.query.payment_type,
		MerchantOrder: request.query.merchant_order_id
	})
});*/

app.listen(appPort, () => {
  console.log("The server is now running on Port: "+appPort);
});
