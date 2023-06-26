
import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";

//Init app
let app = express();

//connect to MongoDB
ConnectDB();

//config view Engine
configViewEngine(app);

//Enable post data for request

app.use(bodyParser.urlencoded({extended: true}));

initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Hello Hoang Tran, I'm running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`);
});