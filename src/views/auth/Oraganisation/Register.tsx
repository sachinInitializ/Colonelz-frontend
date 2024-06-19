import { useState } from "react"
import RegisterForm from "./RegisterForm"
import ForgotPasswordForm from "./verify"


const Register = () => {
    const [verified,setVerified] = useState(false)
    const [userData,setUserData] = useState({} as any)
    console.log(userData,verified);
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Welcome!</h3>
                <p>Please enter your details to register your Oraganisation!</p>
            </div>
          
            
            {!userData.email ?
            <RegisterForm disableSubmit={false} userData={setUserData}  />:
            <ForgotPasswordForm userData={userData}/>}
        </>
    )
}

export default Register
