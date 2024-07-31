import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import apiConfig from '@/config/api-config';

interface User {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    hours: number;
}

export const useUserStore = defineStore("user", () => {
    const accessToken: Ref<string> = ref('');
    const user = ref({
        id: '',
        firstname: '',
        lastname: '',
        username: '',
        hours: 40
    });
    const loginError = null;

    function setAccessToken(token: string, userObject: User) {
        accessToken.value = token;
        user.value = userObject
    }

    async function fetchUser() {
        const fetchResult = await fetch(apiConfig.USER, {
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

        user.value = await fetchResult.json();
    }

    function isLoggedIn() {
        return accessToken.value !== '';
    }

    async function clear() {
        const fetchResult = await fetch(apiConfig.USER + "/logout", {
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

        accessToken.value = '';
        user.value = {
            id: '',
            firstname: '',
            lastname: '',
            username: '',
            hours: 40
        };
    }

    return { 
        user, 
        accessToken, 
        loginError, 
        setAccessToken, 
        fetchUser, 
        clear, 
        isLoggedIn 
    };
});