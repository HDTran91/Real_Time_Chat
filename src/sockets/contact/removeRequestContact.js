import { pushSocketIdToArray, emotNotifyToArray, removeSocketIdFromArray } from "../../helpers/socketHelper";

/**
 * @param io from sock.io lib
 */

let removeRequestContact = (io) => {
    let clients = {};
    io.on("connection", (socket)=>{
        //push socket id to array
        clients = pushSocketIdToArray(clients, socket.request.user._id, socket_id )
        // console.log(clients)
        // console.log(socket.id);
        socket.on("remove-request-contact", (data) =>{
            // console.log(data)
            // console.log(socket.request.user);
            let currentUser = {
                id: socket.request.user._id
            };
            //emit notification
            if (clients[data.contactId]) {
                emotNotifyToArray(clients, data.contactId, io,"response-remove-request-contact", currentUser )
            }
           
        });

        socket.on("disconnect", () => {
            //remove socketId when socket disconnect
        clients = removeSocketIdFromArray(clients,socket.request.user._id,socket )
        });

    //    console.log(clients)
    })
}
module.exports = removeRequestContact;