export default class User {
    constructor(user_id, user_login, user_password, user_role_id, user_email) {
        this.user_id = user_id;
        this.user_login = user_login;
        this.user_password = user_password;
        this.user_role_id = user_role_id;
        this.user_email = user_email;
    }
}