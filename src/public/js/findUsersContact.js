function callFindUsers(element) {
    if(element.which === 13 || element.type === "click") {
        let keyword = $("#input-find-users-contact").val()
            // console.log(keyword);
        let regexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/)
        if (!keyword.length) {
            alertify.notify("chua nhap noi dung tim kiem","error", 7)
            return false;
        }
        if(!regexKeyword.test(keyword)) {
            alertify.notify("loi tu khoa tim kiem","error",7)
            return false;
        }
        $.get(`/contact/find-users/${keyword}`,function(data){
            $("#find-user ul").html(data);
        })
    }
}

$(document).ready(function(){
    $("#input-find-users-contact").bind("keypress", callFindUsers)

    $("#btn-find-users-contact").bind("click", callFindUsers)
 
});