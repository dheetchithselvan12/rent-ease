const ValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// const ValidEmail = /^\S+@\S+\.\S+$/

export const validateRegister = (data) => {
    const error = {};

    if(!data.firstName) {
        error.firstName = 'First name is required';
    } else if(data.firstName.length < 3) {
        error.firstName = 'First name must be at least 3 characters';
    }
    if(!data.lastName) {
        error.lastName = 'Last name is required';
    }
    if(!data.email) {
        error.email = 'Email is required';
    } else if(!ValidEmail.test(data.email)) {
        error.email = 'Email is invalid';
    }
    if(!data.password) {
        error.password = 'Password is required';
    } else if (data.password.length < 6 || data.password.length > 10) {
        error.password = 'Password must be between 6 and 10 characters';
    }
    if(!data.password2) {
        error.password2 = 'Confirm password is required';
    } else if (data.password != data.password2) {
        error.password2 = 'Passwords do not match';
    }
    return error;
}