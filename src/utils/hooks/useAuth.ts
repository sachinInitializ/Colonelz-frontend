import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'
import { toast } from '@/components/ui'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useAppSelector((state) => state.auth.session)

    const signIn = async (
        values: SignInCredential
    ) => {

            const resp =await apiSignIn(values)
            console.log(resp);
            if (resp.code===200) {
                const { token } = resp.data
                console.log('token',resp.data.role);
                dispatch(signInSuccess({ token, userId: resp.data.userID }))
                if (resp.data) {
                    dispatch(
                        setUser(
                            {
                                authority: [resp.data.role],
                                user_name: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: `${resp.errorMessage}`,
                }
            }
            else{
            return{
                status: 'failed',
                message: `${resp.errorMessage}`,
            }
            }
              
    }

    const signUp = async (values: SignUpCredential) => {
        
            const resp = await apiSignUp(values)
           console.log('signup',resp);
          return resp
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                avatar: '',
                userName: '',
                user_name: '',
                authority: [],
            })
            )
            navigate(appConfig.unAuthenticatedEntryPath)
            window.location.reload()
    }

    const signOut = async () => {  
        await apiSignOut()
        handleSignOut()
    }
    setTimeout(signOut, 7*24*60*60*1000);

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
