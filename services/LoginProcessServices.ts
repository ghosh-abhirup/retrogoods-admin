import axiosInstance from '../axiosInstance';

export const loginUser = (payload: Object) => {
    return axiosInstance.post('users/login', payload, { withCredentials: true });
}

export const registerUser = (payload: Object) => {
    return axiosInstance.post('users/register', {
        ...payload,
        type: 'provider'
    });
}