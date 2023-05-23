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
            })
        }
    },
    actions: {
        setToken(token) {
            this.user.token = token;
            localStorage.setItem("userToken", token);
        },

        removeToken() {
            this.user.token = null;
            localStorage.removeItem("userToken");
        },

        setUser(data) {
            this.user.data = {

            }
        },

        isAuthenticated() {
            return this.user.token;
        }
    }
});
