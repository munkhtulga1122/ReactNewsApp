export function isEmpty(str) {
    return (!str || 0 === str.length);
}

export function validateEmail(email) {
    let pattern = "/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/";
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (filter.test(email)) return true;
    return false;
}

export function validatePassword(email) {
}

export function validate(form) {
    let error = {};
    let success = true;

    var keys = Object.keys(form);
    var length = keys.length;

    keys.slice(0, length - 1).map(field => {
        if (form[field] !== null){
            var { type, value } = form[field];
            if (isEmpty(value)){
                error[field] = '' + field + ' буруу байна';
                success = false;
            }else{
                error[field] = '';

                if (type === "email" && !validateEmail(value)){
                    error[field] = 'И-мэйл хаягаа шалгана уу';
                    success = false;
                }
            }
        }
    });

    return {success, error};

}