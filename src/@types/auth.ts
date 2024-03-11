export type SignInCredential = {
    user_name: string
    password: string
}

export interface SignInResponse {
    data: {
        userID: string;
        token: string;
        role: string;
    };
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    id:string
    user_name: string
    email: string
    role: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
