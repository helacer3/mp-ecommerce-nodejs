const express     = require("express");
const mercadopago = require("mercadopago");
const config      = require("./config.js");
const app         = express();

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

app.post("/notification", function (req, res) {
  // res.status(200).sendFile("front/responses.html", { root: __dirname });
  console.log("Respuesta Notificacin: ", res);
}); 


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

	let preference = {
		payer: {
			name: "Lalo",
			surname: "Landa",
			email: "test_user_83958037@testuser.com",
			phone: {
				area_code: "",
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
			title: req.body.description,
			description: "",
			picture_url: "",			
			unit_price: Number(req.body.price),
			quantity: Number(req.body.quantity),
		}],
		back_urls: {
			"success": "/success",
			"failure": "/failure",
			"pending": "/pending"
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
		    ]
		},
		notification_url: "/notification",
		external_reference: "helacer3@yahoo.es",
		installments: 6,
		auto_return: 'approved',
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json(response)
		}).catch(function (error) {
			console.log(error);
		});
});


/*
Estos son los parámetros que enviamos en la QueryString cuando redirigimos a las back_url establecidas:
https://www.tusitio.com/success.php?collection_id=[PAYMENT_ID]&collection_status=approved&external_refe
rence=[EXTERNAL_REFERENCE]&payment_type=credit_card&preference_id=[PREFERENCE_ID]&site_id=[
SITE_ID]&processing_mode=aggregator&merchant_account_id=null
*/


app.get('/success', function(request, response) {
	response.json({
		Payment: request.query.collection_id,
		Status: request.query.collection_status,
		ExternalReference: request.query.external_reference,
		PaymentType: request.query.payment_type,
		MerchantOrder: request.query.merchant_order_id
	})
});

app.listen(3000, () => {
  console.log("The server is now running on Port 3000");
});
