/**
 * This would be some code in some NetSuite event that hits RabbitMQ's REST API
 */
function recordAfterSubmit(type) {
	var start = new Date().getTime();

	var recId = nlapiGetRecordId();
	var recType = nlapiGetRecordType();
	var record = nlapiLoadRecord(recType, recId);

	var amqpUrl = 'XXXXXX';
	var headers = {
		'Content-Type': 'application/json',
		'Authorization': 'Basic XXXXX'
	};
	var data = {
		"delivery_mode": '1',
		"headers": {},
		"name": 'orders',
		"payload": JSON.stringify(record),
		"payload_encoding": 'string',
		"properties": {"delivery_mode":1, "headers":{}},
		"props": {},
		"routing_key": '',
		"vhost": '/'
	};

	try {
		var response = nlapiRequestURL(amqpUrl, JSON.stringify(data), headers);
		nlapiLogExecution('DEBUG', 'RabbitMQ Response (' + response.getCode() + ')', response.getBody());
	} catch (err) {} finally {
		var finish = new Date().getTime();
		nlapiLogExecution('DEBUG', 'Record Changed Took ' + ((finish - start) / 1000) + ' seconds');
	}
}
