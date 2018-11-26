const EventEmitter = require('events');

let emitter = new EventEmitter();

emitter.on('message', (data) => {

});

emitter.emit('message', {a:1});
