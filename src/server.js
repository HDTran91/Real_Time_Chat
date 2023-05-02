
import express from "express";
import ConnectDB from "./config/connectDB";
import ContactModel from "./models/contact.model";

let app = express();

//connect to MongoDB
ConnectDB();


app.get("/test-database", async(req,res)=>{
    try {
        let item ={
            userId: "124124241",
            contactId: "1242142141421142"
        };
        let contact = await ContactModel.createNew(item);
        res.send(contact);

    } catch (err){
        console.log(err);
    }

});

app.listen(process.env.APP_PORT, process.env.HOSTNAME, () => {
    console.log(`Hello Hoang Tran, I'm running at ${process.env.HOSTNAME}:${process.env.APP_PORT}/`);
});