import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import Cookies from 'js-cookie'

export interface SessionState {
    signedIn: boolean
    token: string | null
    userId: string | null 
}

const initialState: SessionState = {
    signedIn: false,
    token: null,
    userId: Cookies.get('userId') || null, 
}

interface SignInPayload {
    token: string;
    userId: string;
}

const sessionSlice = createSlice({
    name: `${SLICE_BASE_NAME}/session`,
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<SignInPayload>) {
            state.signedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId; 
            localStorage.setItem('auth', action.payload.token);
  localStorage.setItem('userId', action.payload.userId);
},
        signOutSuccess(state) {
            state.signedIn = false;
            state.token = null;
            state.userId = null; 
            localStorage.removeItem('auth');
            localStorage.removeItem('userId');
            Cookies.remove('userId'); 
        },
    },
});

export const { signInSuccess, signOutSuccess } = sessionSlice.actions
export default sessionSlice.reducer
