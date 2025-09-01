
const validator = require('validator');

const validateSignUpData = (req)=>{

    const {firstName, lastName, email, password, phoneNumber} = req.body;

    if(!firstName || !lastName || !email || !password ){
            throw new Error("Name is not valid.");
    }
    else if(firstName.length <4 || firstName.length >50){
        throw new Error("please enter the valid name");
    }
    else if(!validator.isEmail(email)){
        throw new Error("please enter a valid email.");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password..")
    }
    else if(phoneNumber.length <10 || phoneNumber.length > 13){
        throw new Error("Enter a valid phone Number.")
    }
};

module.exports = {
    validateSignUpData,
}
