import { pushSocketIdToArray, emotNotifyToArray, removeSocketIdFromArray } from "../../helpers/socketHelper";
/**
 * @param io from sock.io lib
 */

let addNewContact = (io) => {
    let clients = {};
    io.on("connection", (socket)=>{

        //push socket id to array
        clients = pushSocketIdToArray(clients, socket.request.user._id, socket_id )
        // console.log(clients)
        // console.log(socket.id);
        socket.on("add-new-contact", (data) =>{
            console.log(data)
            console.log(socket.request.user);
            let currentUser = {
                id: socket.request.user._id,
                username: socket.request.user._username,
                avatar: socket.request.user.avatar
            };
            //emit notification
            if (clients[data.contactId]) {
                emotNotifyToArray(clients, data.contactId, io,"response-add-new-contact", currentUser )
            }
           
        });

        socket.on("disconnect", () => {
            //remove socketId when socket disconnect
            clients = removeSocketIdFromArray(clients,socket.request.user._id,socket )
        });

    //    console.log(clients)
    })
}
module.exports = addNewContact;