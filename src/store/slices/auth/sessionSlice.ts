import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import Cookies from 'js-cookie'

export interface SessionState {
    signedIn: boolean
    token: string | null
    userId: string | null // Add the user ID to the state
}

const initialState: SessionState = {
    signedIn: false,
    token: null,
    userId: Cookies.get('userId') || null, // Get the user ID from cookies
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
            state.userId = action.payload.userId; // Store the user ID in the state
            Cookies.set('auth', action.payload.token); // Store the token in cookies
            Cookies.set('userId', action.payload.userId); // Store the user ID in cookies
        },
        signOutSuccess(state) {
            state.signedIn = false;
            state.token = null;
            state.userId = null; // Remove the user ID from the state
            Cookies.remove('auth'); // Remove the token from cookies
            Cookies.remove('userId'); // Remove the user ID from cookies
        },
    },
});

export const { signInSuccess, signOutSuccess } = sessionSlice.actions
export default sessionSlice.reducer
