import { ref } from 'vue';

interface User {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    hours: number
}

export const authState = ref({
    accessToken: '',
    user: {
        id: '',
        firstname: '',
        lastname: '',
        username: '',
        hours: 40
    },
    loginError: null
});

export function setAccessToken(accessToken: string, user: User) {
    authState.value.accessToken = accessToken;
    authState.value.user = user;
}

export async function storeUserData() {
    const fetchResult = await fetch("http://localhost:3000/api/user", {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    if (!fetchResult.ok) {
        throw "User not found";
    }
    
    authState.value.user = await fetchResult.json();
}

export function isLoggedIn(): Boolean {
    return authState.value.accessToken != '';
}

export async function clearAuthData() {
    const fetchResult = await fetch("http://localhost:3000/api/user/logout", {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    if (!fetchResult.ok) {
        throw "User cannot be logged out";
    }

    authState.value.accessToken = '';
    authState.value.user = {
        id: '',
        firstname: '',
        lastname: '',
        username: '',
        hours: 40
    };

    authState.value.loginError = null;
}