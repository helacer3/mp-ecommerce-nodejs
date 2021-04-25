$(function() {
	// read Cookies
	let datInitCookie = readCookie("datInit");
	let datIdCookie   = readCookie("datId");

	console.log("datInitCookie: ", datInitCookie);
	console.log("datId: ", datIdCookie);

	// $('#lnkPagar').attr("href", datInitCookie);

	const mp = new MercadoPago('APP_USR-a98b17ae-47a6-4a35-b92d-01919002b97e', {
		locale: 'es-CO'
	});

	mp.checkout({
		preference: {
			id: datIdCookie,
		},
		render: {
	    	container: '#lnkPagar',
	    	label: 'PAGAR LA COMPRA',
	    	type: 'wallet',
	    },
	    rediretc: 'modal'
	});

	/**
	* read Cookie
	*/
	function readCookie(name) {
		var nameEQ = name + "="; 
		var ca = document.cookie.split(';');

		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) {
		  			return decodeURIComponent( c.substring(nameEQ.length,c.length) );
			}
		}
		// default Return
		return null;
	}




});