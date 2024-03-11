import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { Select } from '@/components/ui'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    id: string
    user_name: string
    email: string
    role:string
}

const validationSchema = Yup.object().shape({
    user_name: Yup.string().required('Please enter your user name'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    role:Yup.string().required('Please enter your role'),   
    
})

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { id,user_name, role, email } = values
        setSubmitting(true)
        const result = await signUp({ id,user_name, role, email })
        console.log('signup', result)
        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    const rolesOptions = [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        {label:'Designer',value:'designer'}
    ]

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    id:'65c32e19e0f36d8e1f30955c',
                    user_name: '',
                    email: '',
                    role:'',
                  
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="User Name"
                                invalid={errors.user_name && touched.user_name}
                                errorMessage={errors.user_name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="user_name"
                                    placeholder="User Name"
                                    component={Input}
                                    
                                />
                            </FormItem>
                            <FormItem
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Role"
                                invalid={errors.role && touched.role}
                                errorMessage={errors.role}>
                                      <Field name="role">
                                    {({ field, form }: FieldProps<SignUpFormSchema>) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={rolesOptions}
                                            value={rolesOptions.filter(
                                                (option) =>
                                                    option.value ===
                                                    values.role
                                            )}
                                            onChange={(option) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                                </FormItem>
                          
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Sign Up'}
                            </Button>
                          
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
