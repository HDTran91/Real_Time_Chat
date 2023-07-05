import passport from "passport";
import passportFacebook from "passport-facebook";
import UserModel from "./../../models/userModel";
import {transError,transSuccess} from "./../../../lang/vi";

let FacebookStrategy = passportFacebook.Strategy;

let fbAppId = process.env.FB_APP_ID;
let fbAppSecret = process.env.FB_APP_SECRET;
let fbCallbackUrl = process.env.FB_CALLBACK_URL;

/**
 * valid user account type: facebook
 */

let InitPassportFacebook = () => {
    passport.use(new FacebookStrategy({
        clientID: fbAppId,
        clientSecret: fbAppSecret,
        callbackURL: fbCallbackUrl,
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"]
    }, async (req,accessToken, refreshToken, profile, done) => {
        try{
            let user = await UserModel.findByFacebookUid(profile.id);
            if(user) {
                return done(null, user, req.flash("success",transSuccess.loginSuccess(user.username)))
            }
            
            let newUserItem ={
                username: profile.displayName,
                gender: profile.gender,
                local: {isActive: true},
                facebook: {
                    uid: profile.id,
                    token: accessToken,
                    email: profile.emails[0].value
                }
            };
            
            let newUser = await UserModel.createNew(newUserItem);
            return done(null, newUser, req.flash("success",transSuccess.loginSuccess(newUser.username)))
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

module.exports = InitPassportFacebook;