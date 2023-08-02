import multer from "multer";
import {app} from "./../config/app";
import {transError, transSuccess} from "./../../lang/vi";
import uuidv4 from "uuid/v4";
import {user} from "./../service/index";
import fsextra from "fs-extra"


let storageAvatar = multer.diskStorage({
    destination: (req, file,callback) => {
        callback(null,app.avatar_directory); // where save picture
    },

    //validation the file updated
    filename: (req, file,callback) => {
        let math = app.avatar_type;
        if (math.indexOf(file.mimetype) === -1) {
            return callback(transError.avatar_type, null);
        }

        let avatarName = `${Date.now()}-${uuidv4}-${file.originalname}`;
        callback(null,avatarName)
    }
});

let avatarUploadFile = multer({
    storage: storageAvatar,
    limits: {fileSize: app.avatar_limit_size}
}).single("avatar");

let updateAvatar = (req,res) => {
    avatarUploadFile (req,res, (error)=>{
        if(error) {
            if(error.message) {
                return res.status(500).send(transError.avatar_size);
            }
            return res.status(500).send(error);
        }
        try {
            let updateUserItem ={
                avatar: req.file.filename,
                updateAt: Date.now(),
            };
            let userUpdate = user.updateUser(req.user._id, updateUserItem);
            // remove old user avatar
            fsExtra.remove(`${app.avatar_directory}/${userUpdate.storageAvatar}`)
            let result ={
                message: transSuccess.avatar_updated,
                imageSrc: `/image/users/${reg.file.filename}`
            }
            return res.status(200).send(result);

        }catch(error){
                return res.status(500).send(error);
            }
    });
}

module.exports = {
    updateAvatar: updateAvatar
}