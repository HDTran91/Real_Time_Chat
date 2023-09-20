import { contact } from "../controllers";
import contactModel from "./../models/contactModel"
import userModel from "./../models/userModel"
import _ from "lodash";

let findUsersContact = (currentUserId,keyword)=> {
    return new Promise( async (resolve, reject)=> {
        let deprecatedUserIds = [currentUserId];
        let contactsByUser = await contactModel.findAllByUser(currentUserId);
        contactsByUser.forEach((contact)=> {
            deprecatedUserIds.push(contact.userId);
            deprecatedUserIds.push(contact.contactId);
        });

        //loc het nhung du lieu giong nhau
        deprecatedUserIds = _.uniqBy(deprecatedUserIds);
        let users = await userModel.findAllForAddContact(deprecatedUserIds,keyword);
        resolve(users);
    });
}

let addNew = (currentUserId,contactId)=> {
    return new Promise( async (resolve, reject)=> {
        let contactExist = await contactModel.checkExist(currentUserId,contactId);
        if(contactExist) {
            return reject(false)
        }
        let newContactItem = {
            userId: currentUserId,
            contactId: contactId
        };
        let newContact = await contactModel.createNew(newContactItem);
        resolve(newContact)
    });
}

let removeRequestContact= (currentUserId,contactId)=> {
    return new Promise( async (resolve, reject)=> {
       let removeReq = await contactModel.removeRequestContact(currentUserId,contactId);
      if(removeReq.result.n === 0){
        return reject(false);
      }
      resolve(true)
    });
}
module.exports = {
    findUsersContact:findUsersContact,
    addNew: addNew,
    removeRequestContact:removeRequestContact
}