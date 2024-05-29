import { ref } from 'vue'

interface User {
    id: string
    firstname: string;
    lastname: string;
    username: string
}

export const authState = ref({
    accessToken: '',
    user: {
        id: '',
        firstname: '',
        lastname: '',
        username: '',
    },
    loginError: null
});

export function setAccessToken(accessToken: string, user: User) {
    authState.value.accessToken = accessToken;
    authState.value.user = user;    
}

export function isLoggedIn(): Boolean {
    console.log("Accesstoken: " + authState.value.accessToken);    
    return authState.value.accessToken != '';

}

export function clearAuthData() {
    authState.value.accessToken = '';
    authState.value.user = {
        id: '',
        firstname: '',
        lastname: '',
        username: '',
    };
    authState.value.loginError = null
}