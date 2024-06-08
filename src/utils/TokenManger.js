import { jwtDecode } from 'jwt-decode';

export const decodeToken = token => {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        return null;
    }
};

export const checkAccessToken = () => {
};
