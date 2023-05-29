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
            return this.user.token;
        }
    }
});
