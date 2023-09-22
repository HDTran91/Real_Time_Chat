
import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import session from "./config/session";
import passport from "passport";
import http from "http";
import socketio from "socket.io";
import initSockets from "./sockets/index";
import cookieParser from "cookie-parser";
import configSocketIo from "./config/socketio"

//Init app
let app = express();

//Init server with socket.io & express app

let server =http.createServer(app);
let io = socketio(server);

//connect to MongoDB
ConnectDB();

//config session
session.config(app);
//config view Engine
configViewEngine(app);

//Enable post data for request

app.use(bodyParser.urlencoded({extended: true}));

//Enable flash messages
app.use(connectFlash());

//use Cookie Parser
app.use(cookieParser());

//config passport js
app.use(passport.initialize());
app.use(passport.session());

//Init all route
initRoutes(app);

//config for socket.io
configSocketIo(io,cookieParser,session.sessionStore)

// Init all sockets
initSockets(io);

server.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Hello Hoang Tran, I'm running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`);
});