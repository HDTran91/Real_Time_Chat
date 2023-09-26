export let pushSocketIdToArray = (clients, userId, socketId) => {
    if(clients[userId]) {
        clients[userId].push(socketId);
    }else {
        clients[userId] = [socketId];
    }
    return clients
}
export let emotNotifyToArray = (clients, userId, io, eventName, data) => {
    clients[userId].forEach(socketId => {
        io.socket.connected[socketId].emit(eventName, data);
    })
}
export let removeSocketIdFromArray = (clients, userId, socket) => {
    clients[userId] = clients[userId].filter(socketId => {
        return socketId != socket.id;
    });
    if (!clients[userId].length) {
        delete clients[userId]
    }
    return clients
}