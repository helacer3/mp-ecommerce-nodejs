$(function() {

	var searchParams = new URLSearchParams(window.location.search);

	showValue("collection_id");
	showValue("collection_status");
	showValue("external_reference");
	showValue("payment_type");
	showValue("preference_id");
	showValue("site_id");
	showValue("processing_mode");
	showValue("merchant_account_id");

	function showValue(name) {
		if (searchParams.has(name)) {
			let datPayment = searchParams.get(name);
			$('#'+name).show().find("span").html(datPayment);
		}
	}

});



/*
Estos son los parámetros que enviamos en la QueryString cuando redirigimos a las back_url establecidas:
https://www.tusitio.com/success.php?collection_id=[PAYMENT_ID]&collection_status=approved&external_refe
rence=[EXTERNAL_REFERENCE]&payment_type=credit_card&preference_id=[PREFERENCE_ID]&site_id=[
SITE_ID]&processing_mode=aggregator&merchant_account_id=null
*/

