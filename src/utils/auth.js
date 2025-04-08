import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
    const decoded = jwtDecode(token); // Use the named export `decode`
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime;
};
 // Ensure this matches the library's export

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};
 export default jwtDecode