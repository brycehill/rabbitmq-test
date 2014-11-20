var amqp = require('amqp')
var config = require('./config')
var rmq = require('./rabbitmq-utils')
var connection = amqp.createConnection(config)

var type = process.argv[2] || 'new'
var order = {
    orderId: '123',
    customerId: '111',
    amount: 1000,
    ts: new Date().getTime()
};
var message = JSON.stringify(order)

connection.on('ready', function() {
    connection.exchange('orders', {
        type: 'fanout',
        autoDelete: false
    }, function(exchange) {
        exchange.publish('', message)
        console.log(" [x] Sent to Exchange: %s Queue: %s :: Message: %s", exchange.name, type.toUpperCase(), message)
        rmq.safeEndConnection(connection)
    })
})

connection.on('error', function(e) {
    console.log('CONNECTION ERROR', e)
});


