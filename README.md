rabbitmq-test
=============
This code is just to demonstrate rabbitmq's pub/sub capability with multiple listeners. Multiple languages were used only to illustrate the idea that multiple listeners (in differnet languages/technologies) can listen and receive the same messages.

Check out [RabbitMQ's](http://www.rabbitmq.com/tutorials/tutorial-three-python.html) site for more info.

##Listeners
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

##NetSuite
RabbitMQ comes with a REST API that can be hit to publish messages, get queues, etc. The idea is to hit this API from within suitescript after records are updated/created/deleted. We can then have multiple people listening for these events and they can do with them what they want. This is preferable as we don't have to clutter app code with multiple API calls. This is also more scalable because we don't have to add yet another API call if someone else wants to listen in on this information. It's simply up to the client to build an appropriate listener.
