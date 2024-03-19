import axios from 'axios';
import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
    OtpVerify,
} from '@/@types/auth'
import Cookies from 'js-cookie';
import appConfig from '@/configs/app.config';
import { Alert, Notification, toast } from '@/components/ui';

const token = Cookies.get('auth');
 // Replace 'token' with the name of your cookie

 const { apiPrefix } = appConfig

export async function apiSignIn(data: SignInCredential): Promise<SignInResponse> {
    try {
        const response = await fetch(`${apiPrefix}users/login`, {
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
        const response = await fetch(`${apiPrefix}admin/create/user`, {
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
        const response = await fetch(`${apiPrefix}users/logout`, {
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
    try {
        const response = await fetch(`${apiPrefix}users/sendotp/forget/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        
           alert({message: 'Error sending request to server:', type: 'danger'})
    }
}
export async function apiOtpVerify(data: OtpVerify) {
    try {
        const response = await fetch(`${apiPrefix}users/verifyotp/forget/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error sending request to server:', error);
        throw error;
    }
}

export async function apiResetPassword(data: ResetPassword) {
    try {
        const response = await fetch(`${apiPrefix}users/reset/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error sending request to server:', error);
        throw error;
    }
}
