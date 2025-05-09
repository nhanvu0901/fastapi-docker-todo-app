import axiosClient from "./axiosClient";

const loginUser = ({username, password}) => {
    const url = `/users/login`
    return axiosClient.post(url, {
        username,
        password,
    })
}


const registerUser = ({username, password, email}) => {
    const url = `/users/register`
    return axiosClient.post(url, {
        username,
        password,
        email
    })
}
export {
    loginUser, registerUser
}