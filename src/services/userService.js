import UserModel from "./../models/userModel";
import {transError} from "./../../lang/vi";
import bcrypt from "bcrypt"


const saltRounds = 7;

/**
 * 
 * @param {userId} id 
 * @param {data update} item 
 * @returns 
 */
let updateUser = (id,item) => {
    return UserModel.updateUser(id,item);
};

/**
 * update password for user
 * @param {userId} id 
 * @param {data update} item 
 * @returns 
 */
let updatePassword = (id,dataUpdate) => {
    return new Promise ( async (resolve, reject) => {
        let currentUser = await UserModel.findUserById(id);
        if(!currentUser) {
            return reject(transError.account_undefined)
        }

        let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.currentPassword)
        if(!checkCurrentPassword) {
            return reject(transError.user_current_password_failed);
        }
        let salt = bcrypt.genSaltSync(saltRounds);
        await UserModel.updatePassword(id,bcrypt.hashSync(dataUpdate.newPassword, salt))
        resolve(true)

    })
}

module.exports ={
    updateUser: updateUser,
    updatePassword:updatePassword
}