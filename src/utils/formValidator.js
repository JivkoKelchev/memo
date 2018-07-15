
const validationLogin = ( loginFormObj) => {
    let validationObj = {};

        if ( loginFormObj.username === ''){
            validationObj.username = 'Username is required!';
        }else{
            validationObj.username = '';
        }

        if ( loginFormObj.password.length < 8){
            validationObj.password = 'Password must be at least 8 characters!';
        }else{
            validationObj.password = '';
        }


    return validationObj;
};

const validationSignUp = ( signupFormObj) => {
    let validationObj = {};

        if ( signupFormObj.username === ''){
            validationObj.username = 'Username is required!';
        }else{
            validationObj.username = '';
        }

        if ( signupFormObj.password.length < 8){
            validationObj.password = 'Password must be at least 8 characters!';
        }else{
            validationObj.password = '';
        }

        if ( signupFormObj.confirm !== signupFormObj.password){
            validationObj.confirm = 'Passwords mismatch!';
        }else{
            validationObj.confirm = '';
        }
    return validationObj;
};

const validationChangePass = ( changePassFormObj) => {
    let validationObj = {};

    if ( changePassFormObj.password.length < 8){
        validationObj.password = 'Password must be at least 8 characters!';
    }else{
        validationObj.password = '';
    }

    if ( changePassFormObj.confirm !== changePassFormObj.password){
        validationObj.confirm = 'Passwords mismatch!';
    }else{
        validationObj.confirm = '';
    }
    return validationObj;
};

export  {validationLogin, validationSignUp, validationChangePass}