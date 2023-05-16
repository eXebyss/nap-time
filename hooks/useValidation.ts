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

    const passwordValidation = (password: String) => {
        let passwordErrorMessage = '';
        let isPasswordValid = false;

        const specialCharRegEx = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        const numberRegEx = /\d/;
        const lowerAndUpperCaseRegEx = /^(?=.*[a-z])(?=.*[A-Z])/;

        if (!password || password?.length === 0) {
            isPasswordValid = false;
            passwordErrorMessage = 'Password can not be empty!';
        }

        if (password?.length < 6) {
            isPasswordValid = false;
            passwordErrorMessage = 'Password must contain at least 6 symbols!';
        }

        if (!specialCharRegEx.test(String(password))) {
            isPasswordValid = false;
            passwordErrorMessage =
                'Password must contain at least 1 special character!';
        }

        if (!numberRegEx.test(String(password))) {
            isPasswordValid = false;
            passwordErrorMessage = 'Password must contain at least 1 number!';
        }

        if (!lowerAndUpperCaseRegEx.test(String(password))) {
            isPasswordValid = false;
            passwordErrorMessage =
                'Password must contain at least 1 lower case and 1 upper case character!';
        }

        !passwordErrorMessage && (isPasswordValid = true);

        return { isPasswordValid, passwordErrorMessage };
    };

    const getPasswordSecurityLevel = (password: string) => {
        const passwordStrength = [
            'Very Weak',
            'Weak',
            'Moderate',
            'Strong',
            'Very Strong',
            'Extra Strong',
        ];

        let score = 0;
        if (password.length > 6) score += 1;
        if (password.length > 10) score += 1;
        if (/[A-Z]+/.test(password)) score += 1;
        if (/[a-z]+/.test(password)) score += 1;
        if (/\d+/.test(password)) score += 1;
        if (/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password)) score += 1;

        return passwordStrength[score - 1] || 'Unknown';
    };

    return { emailValidation, passwordValidation, getPasswordSecurityLevel };
}

export default useValidation;
