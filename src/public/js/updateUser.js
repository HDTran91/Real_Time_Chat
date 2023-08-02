let userAvatar = null;
let userInfo = {};

//clear anh avatar
let originAvatarSrc = null;

function updateUserInfo() {
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
        userInfo.username = $(this).val();
    });
    $("#input-change-gender-male").bind("click",function(){
        userInfo.gender = $(this).val();
    });
    $("#input-change-gender-female").bind("click",function(){
        userInfo.gender = $(this).val();
    });
    $("#input-change-address").bind("change",function(){
        userInfo.address = $(this).val();
    });
    $("#input-change-phone").bind("change",function(){
        userInfo.phone = $(this).val();
    });
}

$(document).ready(function()
{
    updateUserInfo();
    originAvatarSrc = $("#user-modal-avatar").attr("src");

    $("#input-btn-update-user").bind("click",function(){
        if($.isEmptyObject(userInfo) && !userAvatar ){
            alertify.notify("ban phai thay doi thong tin truoc khi cap nhat du lieu","error",7);
            return false;
        }
        //goi request ajax len server

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
        
        // console.log(userAvatar);
        // console.log(userInfo);        
        
    });

    $("#input-btn-cancel-update-user").bind("click",function(){
       userAvatar = null;
       userInfo = {};
       $("input-change-avatar").val(null);
       $("#user-modal-avatar").attr("src",originAvatarSrc);
    });
    
});