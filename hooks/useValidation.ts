function useValidation() {
    const emailValidation = (props: String) => {
        let emailValidationMessage: string;
        let isEmailValid: boolean;

        const emailRegEx =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailRegEx.test(String(props).toLowerCase())) {
            emailValidationMessage = 'Email is valid';
            isEmailValid = true;
            return { isEmailValid, emailValidationMessage };
        }

        if (!props) {
            emailValidationMessage = '';
            isEmailValid = false;

            return { isEmailValid, emailValidationMessage };
        }

        emailValidationMessage = 'Email is not valid';
        isEmailValid = false;

        return { isEmailValid, emailValidationMessage };
    };

    const passwordValidation = (props: String) => {
        let passwordErrorMessage = '';
        let isPasswordValid = false;

        const specialCharRegEx = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        const numberRegEx = /\d/;
        const lowerAndUpperCaseRegEx = /^(?=.*[a-z])(?=.*[A-Z])/;

        if (!props || props?.length === 0) {
            isPasswordValid = false;
            passwordErrorMessage = 'Password can not be empty!';
        }

        if (props?.length < 6) {
            isPasswordValid = false;
            passwordErrorMessage = 'Password must contain at least 6 symbols!';
        }

        if (!specialCharRegEx.test(String(props))) {
            isPasswordValid = false;
            passwordErrorMessage =
                'Password must contain at least 1 special character!';
        }

        if (!numberRegEx.test(String(props))) {
            isPasswordValid = false;
            passwordErrorMessage = 'Password must contain at least 1 number!';
        }

        if (!lowerAndUpperCaseRegEx.test(String(props))) {
            isPasswordValid = false;
            passwordErrorMessage =
                'Password must contain at least 1 lower case and 1 upper case character!';
        }

        !passwordErrorMessage && (isPasswordValid = true);

        return { isPasswordValid, passwordErrorMessage };
    };

    return { emailValidation, passwordValidation };
}

export default useValidation;
