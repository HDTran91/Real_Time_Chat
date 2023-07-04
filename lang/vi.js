export const transValidation ={
    email_incorrect: "Email phai co dang khoaiga@gmail.com",
    gender_incorrect: "tai sao gioi tinh lai bi sai",
    password_incorrect: "Mat khau chua it nhat 8 ki tu bao gom chu hoa, chu thuong va chu so",
    password_confirmation_incorrect: "nhap khau chua trung khop"
};

export const transError = {
    account_in_use: "Email nay da dc su dung.",
    account_removed: "tai khoan da bi go lai he thong, vui long lien he neu dieu nay la hieu nham",
    account_not_active: "Email nay da dc dang ki nhung chua active, vui long kiem tra email hoac lien he voi bo phan ho tro cua chung toi.",
    token_undefined: "Token ko ton tai",
    login_failed: "sai tai khoan hoac mat khau",
    server_error: "co loi o phia server, vui long lien he voi bo phan ho tro cua chung toi de bao cao loi nay, xin cam on"
};

export const transSuccess  ={
    userCreated: (userEmail) =>{
        return `tai khoan <Strong> ${userEmail} </Strong> da dc tao, vui long kiem tra lai email de active tai khoan tuoc khi dang nhap`; 
    },
    account_active:"kich hoat tai khoan thanh cong, ban co the dang nhap vao ung dung",
    loginSuccess: (username) =>{
        return `Xin chao ${username}, chuc ban mot ngay tot lanh `;
    },
    logout_success: "dang xuat tai khoan thanh cong. hen gap lai cac ban"
}

export const transMail ={
    subject: "AweSome Chat: xac nhan kich hoat tai khoan.",
    template: (linkVerify) =>{
        return ` 
        <h2> ban nhan dc email vi da dang ki tai khoan tren ung dung Awesome Chat. </h2>
        <h3> Vui long click vao lien ket ben duoi de xac nhan tai khoan </h3>
        <h3><a href =" ${linkVerify}" target="blank" >${linkVerify}</a> </h3>
        <h4> Neu tin rang email nay la nham lan, hay bo qua no. xin cam on </h4>
        `;
    },
    send_failed: "co loi trong qua trinh gui email, vui long lien he voi bo phan cua chung toi"
};