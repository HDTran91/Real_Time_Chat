import passport from "passport";
import passportLocal from "passport-local";
import UserModel from "./../../models/userModel";
import {transError,transSuccess} from "./../../../lang/vi";

let LocalStrategy = passportLocal.Strategy;

/**
 * valid user account type: local
 */

let InitPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req,email,password, done) => {
        try{
            let user = await UserModel.findByEmail(email);
            if(!user){
                return done(null,false, req.flash("errors",transError.login_failed));
            }
            if(user.local.isActive == false){
                return done(null,false, req.flash("errors",transError.account_not_active));
            }

            let checkPassword = await user.comparePassword(password);
            if(!checkPassword)  {
                return done(null,false, req.flash("errors",transError.login_failed));
            }
            return done(null, user, req.flash("success",transSuccess.loginSuccess(user.username)))
            
        }catch(error){
            console.log(error);
            return(done(null, false, req.flash("error",transError.server_error)))
        }
    }));

    // save userId session
    passport.serializeUser((user,done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id) 
        .then(user => {
            return done(null, user);
        })
        .catch(error => {
            return done(error, null);
        })
    });
}

module.exports = InitPassportLocal;