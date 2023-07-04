import express from "express";
import {home, auth} from "./../controllers/index";
import {authValid} from "./../validation/index";
import passport from "passport";
import InitPassportLocal from "./../controllers/passportController/local";


//Init all passport
InitPassportLocal();

let router = express.Router();
/**
 * init all routes
 * @param app from exactly express module
 */
let initRoutes = (app) => {
    router.get("/", home.getHome );
    router.get("/login-register", auth.getLoginRegister);
    router.post("/register", authValid.register, auth.postRegister);
    router.get("/verify/:token", auth.verifyAccount );

    //router for passport
    router.post("/login", passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/login-register",
        successFlash: true,
        failureFlash: true
    }));
    
    return app.use("/", router);
};
module.exports = initRoutes;