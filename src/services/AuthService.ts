import axios from 'axios';
import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
} from '@/@types/auth'
import Cookies from 'js-cookie';

const token = Cookies.get('auth');
 // Replace 'token' with the name of your cookie

export async function apiSignIn(data: SignInCredential): Promise<SignInResponse> {
    try {
        const response = await fetch('https://col-back.onrender.com/v1/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Received response from server:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error sending request to server:', error);
        throw error;
    }
}

export async function apiSignUp(data: SignUpCredential) {
    try {
        const response = await fetch('https://col-back.onrender.com/v1/api/admin/create/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Received response from server:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error sending request to server:', error);
        throw error;
    }
}

export async function apiSignOut() {
    try {
        const token = Cookies.get('auth');
        const userId = Cookies.get('userId'); // Get the userId from cookies 
        // Get the token from cookies
        const response = await fetch('https://col-back.onrender.com/v1/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the token to the Authorization header
            },
            body: JSON.stringify({ userId,token })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log('Received response from server:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error sending request to server:', error);
        throw error;
    }
}

export async function apiForgotPassword(data: ForgotPassword) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data: ResetPassword) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
