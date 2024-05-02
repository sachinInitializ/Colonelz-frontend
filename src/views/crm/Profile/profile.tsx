import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Switcher from '@/components/ui/Switcher'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer, FormItem } from '@/components/ui/Form'


import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineBriefcase,
    HiOutlineUser,
    HiCheck,
    HiOutlineGlobeAlt,
} from 'react-icons/hi'
import * as Yup from 'yup'
import type { OptionProps, ControlProps } from 'react-select'
import type { FormikProps, FieldInputProps, FieldProps } from 'formik'
import FormRow from '@/views/account/Settings/components/FormRow'
import { use } from 'i18next'
import { useEffect, useState } from 'react'
import { addProfilePhoto, apiGetUserData } from '@/services/CommonService'
import { RiEdit2Line } from 'react-icons/ri'

export type ProfileFormModel = {
    username: string
    email: string
    role: string
    avatar: string
}
export type ProfileUpdate = {
    userId: string
    avatar: string
}

type ProfileProps = {
    data?: ProfileFormModel
}

type LanguageOption = {
    value: string
    label: string
    imgPath: string
}

const { Control } = components


const validationSchema = Yup.object().shape({
  
    avatar: Yup.string(),
  
})

const langOptions: LanguageOption[] = [
    { value: 'en', label: 'English (US)', imgPath: '/img/countries/us.png' },
    { value: 'ch', label: '中文', imgPath: '/img/countries/cn.png' },
    { value: 'jp', label: '日本语', imgPath: '/img/countries/jp.png' },
    { value: 'fr', label: 'French', imgPath: '/img/countries/fr.png' },
]

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<LanguageOption>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Avatar shape="circle" size={20} src={data.imgPath} />
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({
    children,
    ...props
}: ControlProps<LanguageOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={18}
                    src={selected.imgPath}
                />
            )}
            {children}
        </Control>
    )
}
    
const Profile = ({
  
}: ProfileProps) => {

    const [data, setData] = useState<ProfileFormModel>()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await apiGetUserData(localStorage.getItem('userId'));
                console.log(userData);
                setData(userData.data);  
            } catch (error) {
                console.error('Error fetching lead data', error);
            }
        };
    
        fetchUserData();
    }, []);
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(data?.avatar);
    const onSetFormFile = (
        form: FormikProps<ProfileFormModel>,
        field: FieldInputProps<ProfileFormModel>,
        file: File[]
    ) => {
        const url = URL.createObjectURL(file[0]);
        form.setFieldValue('avatarUrl', url);
        form.setFieldValue(field.name, file[0]);
        setAvatarUrl(url);
    }

    const onFormSubmit = async (
        values: ProfileUpdate,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const formData = new FormData();
        formData.append('userId', values.userId);
        formData.append('file', values.avatar); 
    
        const response = await addProfilePhoto(formData); 
        console.log('response', response);
        setAvatarUrl(data?.avatar);
        toast.push(<Notification title={'Profile updated'} type="success" />, {
            placement: 'top-center',
        });
        setSubmitting(false);
    }




    return (
        <>
      
        <Formik
            enableReinitialize
            initialValues={{
                userId: localStorage.getItem('userId'),
                avatar: data?.avatar,
            } as ProfileUpdate
            }
            
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form className='w-full sm:w-3/5 lg:w-2/5'>
                        <FormContainer>

                        <FormRow
                                name="avatar"
                                label="Avatar"
                                {...validatorProps}
                            >
                               <Field name="avatar">
                                {({ field, form }: FieldProps) => {
                                    const avatarProps = avatarUrl
                                        ? { src: avatarUrl }
                                        : data?.avatar
                                        ? { src: data.avatar }
                                        : {}
                                    return (
                                        <Upload
                                            className="cursor-pointer"
                                            showList={false}
                                            uploadLimit={1}
                                            onChange={(files) => {
                                                const url = URL.createObjectURL(files[0]);
                                                form.setFieldValue('avatarUrl', url);
                                                form.setFieldValue(field.name, files[0]);
                                                setAvatarUrl(url);  
                                            }}
                                            onFileRemove={(files) => {
                                                form.setFieldValue('avatarUrl', '');
                                                form.setFieldValue(field.name, files);
                                                setAvatarUrl('');  
                                            }}
                                        >
                                            <Avatar
                                                className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                size={60}
                                                shape="circle"
                                                icon={<HiOutlineUser />}
                                                {...avatarProps}
                                            />
                                        </Upload>
                                    )
                                }}
                            </Field>
                            </FormRow>
                             
                           
                            <FormItem
                                label="Username"
                            >
                                <Input placeholder={`${data?.username}`} disabled/>
                            </FormItem>
                            <FormItem
                                label="Email"
                            >
                                <Input placeholder={`${data?.email}`} disabled/>
                            </FormItem>
                            <FormItem
                                label="Role"
                            >
                                <Input placeholder='Role' disabled/>
                            </FormItem>
                            
                           
                           
                           

                            <div className="mt-4 ">
                               
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? 'Updating' : 'Update'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
        </>
    )
}

export default Profile
