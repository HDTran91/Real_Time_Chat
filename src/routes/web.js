import express from "express";
import {home,auth} from "./../controllers/index";
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
    
    router.get("/login-register", auth.checkLoggedOut,auth.getLoginRegister);
    router.post("/register",auth.checkLoggedOut ,authValid.register, auth.postRegister);
    router.get("/verify/:token", auth.checkLoggedOut, auth.verifyAccount );

    //router for passport
    router.post("/login",auth.checkLoggedOut, passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/login-register",
        successFlash: true,
        failureFlash: true
    }));
    router.get("/", auth.checkLoggedIn ,home.getHome );
    router.get("/logout",auth.checkLoggedIn, auth.getLogout);
    
    return app.use("/", router);
};
module.exports = initRoutes;