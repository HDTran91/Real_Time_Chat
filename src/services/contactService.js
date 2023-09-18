import contactModel from "./../models/contactModel"
import userModel from "./../models/userModel"
import _ from "lodash";

let findUsersContact = (currentUserId,keyword)=> {
    return new Promise( async (resolve, reject)=> {
        let deprecatedUserIds = [];
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
module.exports = {
    findUsersContact:findUsersContact
}