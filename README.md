rabbitmq-test
=============
This code is just to demonstrate rabbitmq's pub/sub capability with multiple listeners. Multiple languages were used only to illustrate the idea that multiple listeners (in differnet languages/technologies) can listen and receive the same messages.

Check out [RabbitMQ's](http://www.rabbitmq.com/tutorials/tutorial-three-python.html) site for more info.


If you want to test this stuff out on your local machine, you'll need to first install erlang and rabbitmq. Then clone this repo and install the node deps with `npm install`.

Fire up the example listeners:
```bash
php Listeners/php/listener.php
node Listeners/nodejs/listener.js
```

You can then send messages that both of these listeners will receive.
```
node producer.js
```

You'll see both listeners will receive the order and print them to the console. Ideally, once the message is received, the listener can do whatever they want with it (Trigger other events, hit other APIs, etc, etc). This can eventually be expanded to multiple listeners.
