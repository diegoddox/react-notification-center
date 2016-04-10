import EventEmitter from 'eventemitter3';
const emitter = new EventEmitter();

export const EE = emitter;
export const EEmitter = {
    add: (data) => emitter.emit('add/notification', data),
    clear: () => emitter.emit('clear/all')
};

