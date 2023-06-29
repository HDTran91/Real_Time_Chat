export const transValidation ={
    email_incorrect: "Email phai co dang khoaiga@gmail.com",
    gender_incorrect: "tai sao gioi tinh lai bi sai",
    password_incorrect: "Mat khau chua it nhat 8 ki tu bao gom chu hoa, chu thuong va chu so",
    password_confirmation_incorrect: "nhap khau chua trung khop"
};

export const transError = {
    account_in_use: "Email nay da dc su dung.",
    account_removed: "tai khoan da bi go lai he thong, vui long lien he neu dieu nay la hieu nham",
    account_not_active: "Email nay da dc dang ki nhung chua active, vui long kiem tra email hoac lien he voi bo phan ho tro cua chung toi."
};

export const transSuccess  ={
    userCreated: (userEmail) =>{
        return `tai khoan <Strong> ${userEmail} </Strong> da dc tao, vui long kiem tra lai email de active tai khoan tuoc khi dang nhap`;
        
    }
}