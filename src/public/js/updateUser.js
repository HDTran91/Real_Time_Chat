let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
let originUserInfo = {};
let userUpdatePassword = {};

function callLogout() {
    let timerInterval;
    Swal.fire({
        position: "top-end",
        title: "tu dong dang xuat",
        html: "thoi gian: <strong></Strong>",
        timer: 5000,
        onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(()=> {
                Swal.getContent().querySelector("strong").textContent() = Math.ceil(Swal.getTimerLeft()/1000);
            },1000);
        },
        onclose: () => {
            clearInterval(timeInterval);
        }
    }).then((result) => {
        $.get("/Logout", function(){
            Location.reload();
        });
        
    });
}

function updateUserInfo() {

    // update username and avatar
    $("#input-change-avatar").bind("change", function (){
        let fileData = $(this).prop("files")[0]
        let math = ["image/png", "image/jpg", "image/jpeg" ];
        let limit = 1048576 ; // byte = 1MB

        if($.inArray(fileData.type, math) === -1){
            alertify.notify("kieu file khong hop le, chi chap nhan jpg & png", "error", 7)
            $(this).val(null); //tra du lieu ve null
            return false;
        }
        if (fileData.Size > limit) {
            alertify.notify("anh upload toi da cho phep la 1MB", "error", 7)
            (this).val(null); //tra du lieu ve null
            return false;
        }
        if(typeof FileReader != "undefined"){
            let imagePreview = $("#image-edit-profile");
            imagePreview.empty();

            let fileReader = new FileReader();
            fileReader.onload = function(element){
                $("<img>",{
                    "src" : element.target.result,
                    "class" : "avatar img-circle",
                    "id": "user-modal-avatar",
                    "alt" : "avatar",

                }).appendTo(imagePreview);
            }
            imagePreview.show();
            fileReader.readAsDataURL(fileData);
            
            let formData = new FormData();
            formData.append("avatar", fileData);
            userAvatar = formData;
        }else {
            alertify.notify("Trinh duyet cua ban ko ho tro FileReader", "error", 7)
        }
    });
    $("#input-change-username").bind("change",function(){
        let username = $(this).val();
        let regexUsername = new RegExp("/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/")
        if(!regexUsername.test(username) || username.length < 3 || username.length > 17) {
            alertify.notify("Username gioi han trong khoang 3-17 ki tu va ko dc phep chua ki tu dac biet","error")
            $(this).val(originUserInfo.username)
            delete userInfo.username
            return false;
        }

        userInfo.username = username;
    });
    $("#input-change-gender-male").bind("click",function(){
        let gender = $(this).val()

        if(gender !== "male") {
            alertify.notify("Du lieu gioi tinh co van de", "error")
            $(this).val(originUserInfo.gender)
            delete userInfo.gender;
            return false;
        }
        userInfo.gender = gender;
    });
    $("#input-change-gender-female").bind("click",function(){
        let gender = $(this).val()

        if(gender !== "female") {
            alertify.notify("Du lieu gioi tinh co van de", "error")
            $(this).val(originUserInfo.gender)
            delete userInfo.gender;
            return false;
        }
        userInfo.gender = gender;
        
    });
    $("#input-change-address").bind("change",function(){
        let address = $(this).val()

        if (address.length < 3 || address.length > 30) {
            alertify.notify("dia chi gioi han trong khoang 3-30 ki tu", "error")
            $(this).val(originUserInfo.address)
            delete userInfo.address;
            return false;
        }
        userInfo.address = address;
    });
    $("#input-change-phone").bind("change",function(){
        let phone = $(this).val()
        let regexPhone = new RegExp("/^(0)[0-9]{9,10}$/")
        if (!regexPhone.text(phone)) {
            alertify.notify("so dien thoai viet nam bat dau bang so 0, gioi han trong khoang 10-11 ki tu", "error")
            $(this).val(originUserInfo.phone)
            delete userInfo.phone;
            return false;
        }
        
        userInfo.phone = phone;
    });

    // update password

    $("#input-change-current-password").bind("change",function(){
        let currentPassword = $(this).val()
        let regexPassword = new RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/")
        if (!regexPPassword.text(currentPassword)) {
            alertify.notify("Mat khau chua it nhat 8 ki tu bao gom chu hoa, chu thuong va chu so", "error, 7")
            $(this).val(null)
            delete userUpdatePassword.currentPassword;
            return false;
        }
        
        userUpdatePassword.currentPassword = currentPassword;
    });

    $("#input-change-new-password").bind("change",function(){
        let newPassword = $(this).val()
        let regexPassword = new RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/")
        if (!regexPassword.text(newPassword)) {
            alertify.notify("Mat khau chua it nhat 8 ki tu bao gom chu hoa, chu thuong va chu so", "error, 7")
            $(this).val(null)
            delete userUpdatePassword.newPassword;
            return false;
        }
        
        userUpdatePassword.newPassword = newPassword;
    });

    $("#input-change-confirm-new-password").bind("change",function(){
        let confirmNewPassword = $(this).val()
        
        if(!userUpdatePassword.newPassword) {
            alertify.notify("ban chua nhap mat khau moi", "error, 7")
            $(this).val(null)
            delete userUpdatePassword.confirmnewPassword;
            return false;
        }

        if(confirmNewPassword !== userUpdatePassword.newPassword) {
            alertify.notify("nhap lai mat khau chua chinh xac", "error, 7")
            $(this).val(null)
            delete userUpdatePassword.confirmnewPassword;
            return false;
        }
        
        userUpdatePassword.confirmNewPassword = confirmNewPassword;
    });

    

}

function callUpdateAvatar() {
    $.ajax({
        url: "/user/update-avatar",
        type: "put",
        cache: false,
        contentType: false,
        processData: false,
        data: userAvatar,
        success: function(result){
            $(".user-modal-alert-success").find("span").text(result.message);
            $(".user-modal-alert-success").css("display", "block");

            //update avatar
            $("#navbar-avatar").attr("src", result.imageSrc);
            //update origin avatar src
            originAvatarSrc = result.imageSrc;
            $("input-btn-cancel-update-user").click();
        },
        error: function(error){
            // display error
            console.log(error);
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").css("display", "block");
            $("input-btn-cancel-update-user").click();

        }

    }) 
}

function callUpdateUserInfo() {
    $.ajax({
        url: "/user/update-info",
        type: "put",
        data: userInfo,
        success: function(result){
            $(".user-modal-alert-success").find("span").text(result.message);
            $(".user-modal-alert-success").css("display", "block");

            //update originUserInfo
            originUserInfo = Object.assign(originUserInfo, userInfo);

            //update username at navbar
            $("#navbar-username").text(originuserInfo.username)
            //reset all
            $("input-btn-cancel-update-user").click();
        },
        error: function(error){
            // display error
            console.log(error);
            $(".user-modal-alert-error").find("span").text(error.responseText);
            $(".user-modal-alert-error").css("display", "block");
            $("input-btn-cancel-update-user").click();

        }

    }) 
}

function callUpdateUserPassword(){
    $.ajax({
        url: "/user/update-password",
        type: "put",
        data: userUpdatePassword,
        success: function(result){
            $(".user-modal-password-alert-success").find("span").text(result.message);
            $(".user-modal-password-alert-success").css("display", "block");

            //update originUserInfo
            originUserInfo = Object.assign(originUserInfo, userInfo);

            //update username at navbar
            $("#navbar-username").text(originuserInfo.username)
            //reset all
            $("input-btn-cancel-update-user-password").click();
        },
        error: function(error){
            // display error
            console.log(error);
            $(".user-modal-password-alert-error").find("span").text(error.responseText);
            $(".user-modal-password-alert-error").css("display", "block");
            
            //reset all
            $("input-btn-cancel-update-user-password").click();

            //logout after change password success
            callLogout();

        }

    }) 
};
$(document).ready(function()
{
    
    originAvatarSrc = $("#user-modal-avatar").attr("src");
    originUserInfo ={
        username: $("#input-change-username").val(),
        gender: ($("#input-change-gender-male").is(":checked")) ? $("#input-change-gender-male").val() : $("#input-change-gender-female").val(),
        address: $("#input-change-address").val(),
        phone: $("#input-change-phone").val(),

    };
    // console.log(originUserInfo);

    // update userInfo after change value to update
    updateUserInfo();

    $("#input-btn-update-user").bind("click",function(){
        if($.isEmptyObject(userInfo) && !userAvatar ){
            alertify.notify("ban phai thay doi thong tin truoc khi cap nhat du lieu","error",7);
            return false;
        }


        if( userAvatar) {
            callUpdateAvatar();
        }
        if(!$.isEmptyObject(userInfo)) {
            callUpdateUserInfo();
        }
        
        //goi request ajax len server    
        // console.log(userAvatar);
        // console.log(userInfo);        
        
    });

    $("#input-btn-cancel-update-user").bind("click",function(){
       userAvatar = null;
       userInfo = {};
       $("input-change-avatar").val(null);
       $("#user-modal-avatar").attr("src",originAvatarSrc);
       
       $("#input-change-username").val(originUserInfo.username)
       (originUserInfo.gender === "male") ? $("#input-change-gender-male").click() : $("#input-change-gender-female").click();
       $("#input-change-address").val(originUserInfo.address)
       $("#input-change-phone").val(originUserInfo.phone)
    });

    $("#input-btn-update-user-password").bind("click",function(){
        if (!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmNewPassword){
            alertify.notify("ban phai thay doi day du thong tin", "error", 7)
            return false;
        }
        Swal.fire({
            title: "are you sure?",
            text: "you wont be able to revert this!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonText: "Yes, delete it!",
        }).then((result) =>{
            if(!result.value) {
                $("#input-btn-update-user-password").click();
                return false
            }
            callUpdateUserPassword();
        });

    });
    $("#input-btn-cancel-user-password").bind("click",function(){
        userUpdatePassword = {};
        $("#input-change-current-password").val(null)
        $("#input-change-new-password").val(null)
        $("#input-change-confirm-new-password").val(null)
    });

});
