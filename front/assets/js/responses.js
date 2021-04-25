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
