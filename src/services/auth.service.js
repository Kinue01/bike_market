import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

class AuthService {
    async login(user) {
        const response = await axios.post(API_URL + 'getuser', {
            user_login: user.user_login,
            user_password: user.user_password
        });
        localStorage.setItem('user', JSON.stringify(response.data[0]));
        return response.data;
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user){
        return axios.post(API_URL + 'adduser', {
            user_login: user.user_login,
            user_password: user.user_password,
            user_email: user.user_email
        });
    }
}

export default new AuthService();