$(function() {

	/**
	* button Buy - Event Click
	*/
	$('#btnBuy').on('click', async function(e) {
		// set Request Object
		var reqObject = {
		    quantity: 1,
		    description: "Certificacion MercadoPago",
		    price: 100000
		  };
	    // call Proccess Payment
		await proccessPaymetPreference(reqObject)
			.then(function(response) {
				return response.json();
			})
			.then(function(jsonResponse) {
				console.log("jsonResponse: ", jsonResponse);
				document.cookie = "datId="+jsonResponse.body.response.id+";datInit="+jsonResponse.body.response.init_point;
				window.location.href + "/resume.html";
			})
			.catch(function() {
				console.error("Unexpected error");
			});
	});

	/*
	* proccess Payment Preference
	*/
	async function proccessPaymetPreference(reqObject) {
		// let Default Response
		let defResponse = {};
		// call Create Preference 
		await fetch("/create_preference", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reqObject),
			})
			.then(function(response) {
				return response.json();
			})
			.catch(function() {
				console.error("Unexpected error");
			});
		// default Return
		return defResponse;
	}
});