
function removeRequestContact() {
    $(".user-remove-request-contact").bind("click", function(){
        let targetId = $(this).data("uid")
        $.ajax({
            url: "/contact/remove-request-contact",
            type: "delete",
            data: {uid:targetId},
            success: function(data) {
                if(data.Success) {
                    $("#find-user").find(`div.user-remove-request-contact[data-uid = ${targetId}]`).hide()
                    $("#find-user").find(`div.user-add-new-contact[data-uid = ${targetId}]`).css("display", "inline")           
                    decreaseNumberNotifContact("count-request-contact-sent")
                    socket.emit("remove-request-contact", {contactId:targetId});
                }
            }

        })
    })
}
socket.on("response-remove-request-contact", function(user){
    $(".noti-content").find(`div[data-uid =${user.id}]`).remove();
    // xoa o modal tab yeu cau ket ban
    decreaseNumberNotifContact("count-request-contact-received");
    decreaseNumberNotification("noti_contact_counter");
    decreaseNumberNotification("noti_counter");
});