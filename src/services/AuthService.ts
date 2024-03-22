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

const token=localStorage.getItem('auth');   
const userId=localStorage.getItem('userId');

 const { apiPrefix } = appConfig

export async function apiSignIn(data: SignInCredential): Promise<SignInResponse> {
        const response = await fetch(`${apiPrefix}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });


        const responseData = await response.json();
        console.log('Received response from server:', responseData);
        return responseData;
}

export async function apiAddMember(data:any) {
    data.id=userId;
    
        const response = await fetch(`${apiPrefix}admin/add/member`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

       
        return response;
}
export async function apiSignUp(data: SignUpCredential) {
    const Data:SignUpCredential={
        id:userId,
        email:data.email.toLowerCase(),
        role:data.role,
        user_name:data.user_name
    }
    console.log(Data);
    
        const response = await fetch(`${apiPrefix}admin/create/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(Data)
        });

        const responseData = await response.json();
        return responseData;
}

export async function apiSignOut() {
     const token=localStorage.getItem('auth');
     const userId=localStorage.getItem('userId');
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
}

export async function apiForgotPassword(data: ForgotPassword) {
     const Data:ForgotPassword={
        email:data.email.toLowerCase(),
     }
        const response = await fetch(`${apiPrefix}users/sendotp/forget/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data)
        });        
        return response.json();
}
export async function apiOtpVerify(data: OtpVerify) {
    const Data={
        email:data.email.toLowerCase(),
        otp:data.otp
    }
        const response = await fetch(`${apiPrefix}users/verifyotp/forget/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data)
        });
        const responseData = await response.json();
        return responseData;
    
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
