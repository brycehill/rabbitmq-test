var amqp = require('amqp')
var config = require('../../config')
var connection = amqp.createConnection(config)

connection.on('ready', function() {
    console.log('ready')
    var x = connection.exchange('orders', { type: 'fanout',  autoDelete: false })
    connection.queue('', function(q) {
        console.log('new Q')
        q.bind(x.name, '')
        console.log(' [*] Waiting for %s logs. To exit press CTRL+C', 'new')
        q.subscribe(function(msg, headers, deliveryInfo) {
            console.log(' [x] %s: %s', deliveryInfo.routingKey.toUpperCase(), msg.data.toString('utf-8'))
        })
    })
})

connection.on('error', function(e) {
    console.log('CONNECTION ERROR', e)
});
