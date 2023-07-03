import userModel from "./../models/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import {transError,transSuccess,transMail} from "./../../lang/vi";
import sendMail from "./../config/mailer";

let register =  (email, gender, password, protocol, host) => {
    return new Promise(async(resolve, reject)=>{
        let userByEmail = await userModel.findByEmail(email);
        if( userByEmail) {
            if(userByEmail.deletedAt !=  null ){
                return reject(transError.account_removed);
            }
            if(!userByEmail.local.isActive){
                return reject(transError.account_not_active);
            }
            return reject(transError.account_in_use);
        }
        let salt = bcrypt.genSaltSync(10);
        let userItem = {
            username: email.split("@")[0],
            gender: gender,
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuidv4()
            }
        };
        let user = await userModel.createNew(userItem);
        let linkVerify =`${protocol}://${host}/verify/${user.local.verifyToken} `;
        //send email
        sendMail(email, transMail.subject, transMail.template(linkVerify) )
            .then(success => {
                resolve(transSuccess.userCreated(user.local.email));
            
            })
            .catch(async (error) => {
                await userModel.removeById(user._id);
                // remove user ( da dc tao nhung bi loi nen phai remove)
                console.log(error);
                reject(transMail.send_failed)
            });
        
    });

    
};

let verifyAccount = (token) =>{
    return new Promise(async(resolve,reject)=>{
        let userByToken = await userModel.findByToken(token);
        if(!userByToken) {
            return reject(transError.token_undefined);
        }
        await userModel.verify(token);
        resolve(transSuccess.account_active);
    });
}

module.exports = {
    register: register,
    verifyAccount: verifyAccount
};