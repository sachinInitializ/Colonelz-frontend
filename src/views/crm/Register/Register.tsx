import RegisterForm from './RegisterForm'

const Register = () => {
    return (
        <>
        <div className='grid grid-cols-2 '>
            <div>
            <div className="mb-8">
                <h3 className="mb-1">Create User</h3>
            </div>
            <RegisterForm disableSubmit={false} />
            </div>
            </div>
        </>
    )
}

export default Register
