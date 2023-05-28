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
                token: localStorage.getItem('userToken'),
                refreshToken: localStorage.getItem('userRefreshToken'),
            })
        }
    },
    actions: {
        setToken(token) {
            this.user.token = token;
            localStorage.setItem("userToken", token);
        },

        setRefreshToken(refreshToken) {
            this.user.refreshToken = refreshToken;
            localStorage.setItem('userRefreshToken', refreshToken);
        },

        removeToken() {
            this.user.token = null;
            localStorage.removeItem("userToken");
        },

        removeRefreshToken() {
            this.user.refreshToken = null;
            localStorage.removeItem("userRefreshToken");
        },

        setUser(data) {
            this.user.data = {}
        },

        isAuthenticated() {
            return this.user.token;
        }
    }
});
