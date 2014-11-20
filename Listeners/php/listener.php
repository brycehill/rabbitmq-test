<?php
/*
 * This is another example of a listener that could be written.
 */

require 'config.php';
use PhpAmqpLib\Connection\AMQPConnection;

$exchange = 'orders';
$conn = new AMQPConnection(HOST, PORT, USER, PASS, VHOST);
$ch = $conn->channel();

/*
    We declare the queue/exchange again in case it hasn't been created. This may be unnecessary in our case.
    type: direct
    passive: false
    durable: true // the exchange will survive server restarts
    auto_delete: false //the exchange won't be deleted once the channel is closed.
*/
$ch->exchange_declare($exchange, 'fanout', false, false, false);
/*
    passive: false
    durable: true // the queue will survive server restarts
    exclusive: false // the queue can be accessed in other channels
    auto_delete: false //the queue won't be deleted once the channel is closed.
*/
list($queue, ,) = $ch->queue_declare('', false, false, false, false, false);

$ch->queue_bind($queue, $exchange);
echo ' [*] Waiting for logs. To exit press CTRL+C', "\n";

$sendToMarketo = function($msg) {
    // We have the message (order?) do something with it. Send to Marketo, whatever.
    echo ' [x] ', $msg->body, "\n";
};

$ch->basic_consume($queue, '', false, true, false, false, $sendToMarketo);
while (count($ch->callbacks)) { $ch->wait(); }

$ch->close();
$conn->close();
