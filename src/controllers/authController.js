let getLoginRegister = (req,res)=>{
    return res.render("auth/master");

};

let getLogout =(req,res) => {
    // do something
}
module.exports = {
    getLoginRegister: getLoginRegister,
    getLogout: getLogout
};