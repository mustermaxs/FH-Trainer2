const pubsub = (function() {
    var subscribers = {};
    var token = -1;

    const subscribe = (topic, foo) => {
        if (!(topic in subscribers)) {
            subscribers[topic] = [];
        }
        subscribers[topic].push({id: ++token, foo: foo})
        return token;
        
    }
    const publish = (topic, data) => {
        if (!(topic in subscribers)) {
            return
        }
        subscribers[topic].forEach((subscriber) => {
            subscriber.foo(data)
        })
    }
    const unsubscribe = (topic, id) => {
        for (var i=0; i < subscribers[topic].length; i++) {
            if (subscribers[topic][i].id == id) {
                subscribers[topic].splice(i, 1);
            }
        }
    }
    return {
        subscribe: subscribe,
        publish: publish,
        unsubscribe: unsubscribe
    }
})();