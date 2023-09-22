
import PassportSocketIo from "passport.socketio";

let configSocketIo =(io, cookieParser,sessionStore) => {
    io.use(PassportSocketIo.authorize({
        cookieParser: cookieParser,
        key: "process.env.SESSION_KEY",
        secret: "process.env.SESSION_SECRET",
        store: sessionStore,
        success: (data, accept) => {
            if(data.user.logged_in) {
                return accept("Invalid User",false)
            }
            return accept(null,true)
        },
        fail: (data, message, error, accept) => {
            if(error) {
                console.log("failed connection to socket.io", message);
                return accept(new Error(message),false)
            }
        }
    }))
};
module.exports = configSocketIo;