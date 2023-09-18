import authService from "./authServices";
import userService from "./userService";
import contactService from "./contactService";

export const auth = {
    auth: authService,
    user: userService,
    contact: contactService
}