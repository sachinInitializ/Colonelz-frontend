import React, { useState } from 'react'
import Select from 'react-select'
import DatePicker from '@/components/ui/DatePicker/DatePicker'
import { Button, FormItem, Input } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { StickyFooter } from '@/components/shared'

const options = [
    { value: 'Follow Up', label: 'Follow Up' },
    { value: 'Interested', label: 'Interested' },
    { value: 'Not Interested', label: 'Not Interested' },
    { value: 'No Response', label: 'No Response' },
]
const optionsSource = [
    { value: 'At Office', label: 'At Office' },
    { value: 'At Site', label: 'At Site' },
    { value: 'At Client place', label: 'At Client Place' },
    { value: 'Other', label: 'Other' },
]

interface FormData {
    name: string
    email: string
    phone: string
    location: string
    lead_manager: string
    status: string | null
    source: string
    content: string
    createdBy: string
    role: string
    date: string | null
   
}

const LeadForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        location: '',
        lead_manager: '',
        status: null,
        source: '',
        content: '',
        createdBy: 'ADMIN',
        role: 'ADMIN',
        date: null,
    })

    const [errors, setErrors] = useState<Partial<FormData>>({})

    const handleInputChange = (name: keyof FormData, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        })
        setErrors({
            ...errors,
            [name]: '',
        })
    }

    const validateForm = () => {
        const newErrors: Partial<FormData> = {}

        // Basic validation for required fields
        if (!formData.name.trim()) newErrors.name = 'Name is required.'
        if (!formData.email.trim()) newErrors.email = 'Email is required.'
        if (!formData.phone.trim())
            newErrors.phone = 'Phone number is required.'
        if (!formData.location.trim())
            newErrors.location = 'Location is required.'
        if (!formData.status) newErrors.status = 'Status is required.'
        if (!formData.date) newErrors.date = 'Date is required.'

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (
            formData.email.trim() &&
            !emailPattern.test(formData.email.trim())
        ) {
            newErrors.email = 'Invalid email address.'
        }

        // Phone number validation
        const phonePattern = /^\d{10}$/
        const trimmedPhone = formData.phone.trim()
        if (
            trimmedPhone &&
            (!phonePattern.test(trimmedPhone) ||
                formData.phone !== trimmedPhone)
        ) {
            newErrors.phone =
                'Invalid phone number (10 digits only, no spaces, and no leading/trailing spaces).'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            try {
                const formDataToSend = new FormData()
                for (const key in formData) {
                    if (key !== 'files') {
                        formDataToSend.append(key, formData[key])
                    }
                }

            }
               const response = await fetch(
                   'https://col-u3yp.onrender.com/v1/api/admin/create/lead/',
                   {
                       method: 'POST',
                       body: formDataToSend,
                   },
               

                const response = await fetch(
                    'https://col-u3yp.onrender.com/v1/api/admin/create/lead/',
                    {
                        method: 'POST',
                        body: formDataToSend,
                    },
                )

                if (response.ok) {
                    alert('Success! Form submitted successfully.')
                    navigate('/app/leads')
                    window.location.reload()
                } else {
                    alert('Lead creation failed')
                }
            } catch (error) {
                alert(`Error: ${error.message}`)
            }
        } else {
            alert(
                'Form contains validation errors. Please check and submit again.',
            )
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-5">
                <div>
                    <FormItem label="Name">
                        <Input
                            size="sm"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                handleInputChange('name', e.target.value)
                            }
                        />
                    </FormItem>
                    <span className=" text-red-600">{errors.name}</span>
                </div>
                <div>
                    <FormItem label="Email">
                        <Input
                            size="sm"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                handleInputChange('email', e.target.value)
                            }
                        />
                    </FormItem>
                    <span className=" text-red-600">{errors.email}</span>
                </div>
                <div>
                    <FormItem label="Phone">
                        <Input
                            size="sm"
                            type="text"
                            value={formData.phone}
                            onChange={(e) =>
                                handleInputChange('phone', e.target.value)
                            }
                        />
                    </FormItem>
                    <span className=" text-red-600">{errors.phone}</span>
                </div>
                <div>
                    <FormItem label="Location">
                        <Input
                            type="text"
                            value={formData.location}
                            onChange={(e) =>
                                handleInputChange('location', e.target.value)
                            }
                        />
                    </FormItem>
                    <span className=" text-red-600">{errors.location}</span>
                </div>
                <div>
                    <FormItem label="Lead Manager">
                        <Input
                            type="text"
                            value={formData.lead_manager}
                            onChange={(e) =>
                                handleInputChange(
                                    'lead_manager',
                                    e.target.value,
                                )
                            }
                        />
                    </FormItem>
                    <span className=" text-red-600">{errors.lead_manager}</span>
                </div>
                <div>
                    <FormItem label="Status">
                        <Select
                            options={options}
                            value={options.find(
                                (option) => option.value === formData.status,
                            )}
                            onChange={(selectedOption) =>
                                handleInputChange(
                                    'status',
                                    selectedOption.value,
                                )
                            }
                        />
                    </FormItem>
                    <span className=" text-red-600">{errors.status}</span>
                </div>
                <div>
                    <FormItem label="Date">
                        <DatePicker
                            selected={
                                formData.date ? new Date(formData.date) : null
                            }
                            onChange={(date) =>
                                handleInputChange('date', date?.toISOString())
                            }
                        />
                    </FormItem>
                    <span className=" text-red-600">{errors.date}</span>
                </div>
                <div>
                    <FormItem label="Source">
                        <Select
                            options={optionsSource}
                            value={optionsSource.find(
                                (option) => option.value === formData.source,
                            )}
                            onChange={(selectedOption) =>
                                handleInputChange(
                                    'source',
                                    selectedOption.value,
                                )
                            }
                        />
                    </FormItem>
                </div>
                <div>

                    <FormItem label="Description">
                        <Input
                            value={formData.content}
                            onChange={(e) =>
                                handleInputChange('content', e.target.value)
                            }
                            textArea
                        />
                    </FormItem>
                </div>
            </div>
            <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
                <div className="md:flex items-center">
                    <Button
                        size="sm"
                        className="ltr:mr-3 rtl:ml-3"
                        type="button"
                        onClick={() => {
                            navigate(-1)
                            // window.location.reload()
                        }}
                    >
                        Discard
                    </Button>
                    <Button size="sm" variant="solid" type="submit">
                        Submit
                    </Button>
                </div>
            </StickyFooter>
        </form>
    )
}

export default LeadForm
