// import NotificationModel from "./../models/notificationModel"
// import userModel from "./../models/userModel"

// //get Notification when F5 page
// //just 10 item one time
// let getNotifications = (currentUserId, limit = 10) => {
//     return new Promise(async (resolve,reject) =>{
//         try {
//             let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId, limit)
//             let getNotifContents = notifications.map( async (notification) => {
//                 let sender = await userModel.findUserById(notification.senderId);
//                 return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar)
//             });
//             resolve(await Promise.all(getNotifContents))
//             // console.log(getnotifContents)
//         }catch(error) {
//             reject(error)
//         }
//     })
// }
// module.exports = {
//     getNotifications: getNotifications
// }