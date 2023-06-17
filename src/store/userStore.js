import {defineStore} from "pinia";
import {reactive} from "vue";

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            user: reactive({
                data: {
                    firstname: '',
                    lastname: '',
                    email: '',
                },
                token: localStorage.getItem('savings_token'),
                refreshToken: localStorage.getItem('savings_refreshToken'),
            })
        }
    },
    actions: {
        setToken(token) {
            this.user.token = token;
            localStorage.setItem("savings_token", token);
        },

        setRefreshToken(refreshToken) {
            this.user.refreshToken = refreshToken;
            localStorage.setItem('savings_refreshToken', refreshToken);
        },

        removeToken() {
            this.user.token = null;
            localStorage.removeItem("savings_token");
        },

        removeRefreshToken() {
            this.user.refreshToken = null;
            localStorage.removeItem("savings_refreshToken");
        },

        setUser(data) {
            this.user.data = {}
        },

        isAuthenticated() {
            const token = this.user.token;

            if (!token) {
                return false;
            }

            const tokenPayload = this.parseJwt(token);

            return tokenPayload.exp >= Date.now() / 1000;
        },

        parseJwt(token) {
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        },
    }
});
