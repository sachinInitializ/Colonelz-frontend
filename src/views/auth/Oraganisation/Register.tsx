import RegisterForm from "./RegisterForm"


const Register = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Welcome!</h3>
                <p>Please enter your details to register your Oraganisation!</p>
            </div>
            <RegisterForm disableSubmit={false} />
        </>
    )
}

export default Register
