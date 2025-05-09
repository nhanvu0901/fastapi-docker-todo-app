import axiosClient from "./axiosClient";

const loginUser = () => {
    const url = `/users/login`
    return axiosClient.post(url)
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