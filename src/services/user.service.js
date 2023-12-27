import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

class UserService {
    getUsers() {
        return axios.get(API_URL + 'users');
    }
}

export default new UserService();