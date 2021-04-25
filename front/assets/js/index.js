$(function() {

	/**
	* button Buy - Event Click
	*/
	$('#btnBuy').on('click', async function(e) {
		// set Request Object
		var reqObject = {
		    quantity: 1,
		    baseUrl: window.location.href, 
		    title: "Certificacion MercadoPago",
		    image: "imageProduct",
		    price: 100000
		  };
	    // call Proccess Payment
		await proccessPaymetPreference(reqObject)
			.then(function(jsonResponse) {
				console.log("jsonResponse: ", jsonResponse);
				document.cookie = "datId="+jsonResponse.response.id;
				document.cookie = "datInit="+jsonResponse.response.init_point; // sandbox_init_point
				window.location.replace("/resume");
			})
			.catch(function(error) {
				console.error("Unexpected error", error);
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
				defResponse = response.json();
			})
			.catch(function(error) {
				console.error("Unexpected error: ", error);
			});
		// default Return
		return defResponse;
	}
});