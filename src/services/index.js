import authService from "./authServices";
import userService from "./userService";
import contactService from "./contactService";
import notificationService from "./notificationService"

export const auth = {
    auth: authService,
    user: userService,
    contact: contactService,
    notification: notificationService
}