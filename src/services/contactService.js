import { contact } from "../controllers";
import contactModel from "./../models/contactModel"
import userModel from "./../models/userModel"
import NotificationModel from "./../models/notificationModel"
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
        //create contact
        let newContactItem = {
            userId: currentUserId,
            contactId: contactId
        };
        let newContact = await contactModel.createNew(newContactItem);
        //notification
        let notificationItem = {
            senderId: currentUserId,
            receiverId: contactId,
            type: NotificationModel.types.ADD_CONTACT ,
        };
        await NotificationModel.model.createNew(notificationItem)
        resolve(newContact)
    });
}

let removeRequestContact= (currentUserId,contactId)=> {
    return new Promise( async (resolve, reject)=> {
       let removeReq = await contactModel.removeRequestContact(currentUserId,contactIdcurrentUserId,contactId);
      if(removeReq.result.n === 0){
        return reject(false);
      }
      // remove notification
      let notifTypeAddContact = NotificationModel.types.ADD_CONTACT;
      await NotificationModel.model.removeRequestContactNotification(currentUserId,contactId,notifTypeAddContact)
      resolve(true)
    });
}
module.exports = {
    findUsersContact:findUsersContact,
    addNew: addNew,
    removeRequestContact:removeRequestContact
}