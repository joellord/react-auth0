/* eslint no-restricted-globals: 0 */

import auth0 from 'auth0-js';

const LOGIN_SUCCESS_PAGE = "/secret";
const LOGIN_FAILURE_PAGE = "/";
const LOGOUT_PAGE = "/";

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'joel-auth0.auth0.com',
        clientID: '0J7NZEBRlCai4uRzO10VSmVLtGh8t469',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://joel-auth0.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    });

    constructor() {
        this.login = this.login.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
                localStorage.setItem("access_token", authResult.accessToken);
                localStorage.setItem("id_token", authResult.idToken);
                localStorage.setItem("expires_at", expiresAt);
                location.hash = "";
                location.pathname = LOGIN_SUCCESS_PAGE;
            } else if (err) {
                location.pathname = LOGIN_FAILURE_PAGE;
                console.log(err);
            }
        });
    }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        location.pathname = LOGOUT_PAGE;
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }
}