import React, { useState } from 'react'
import DatePicker from '@/components/ui/DatePicker/DatePicker'
import { Button, FormItem, Input, Notification, Select, toast } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { StickyFooter } from '@/components/shared'
import { apiGetCrmCreateLead } from '@/services/CrmService'
import { format, isValid, parse } from 'date-fns'
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker'

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
    interface FormData {
        [key: string]: any;
    }

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

    const handleDateChange = (date: Date | null) => {
        console.log(date);
        
        setFormData({ ...formData, date });
        setErrors({
          ...errors,
          date: '',
        });
      };

    const validateForm = () => {
        
        const newErrors: Partial<FormData> = {}
        if (!formData.name.trim()) newErrors.name = 'Name is required.'
        if (!formData.email.trim()) newErrors.email = 'Email is required.'
        if (!formData.phone.trim())
            newErrors.phone = 'Phone number is required.'
        if (!formData.location.trim())
            newErrors.location = 'Location is required.'
        if (!formData.status) newErrors.status = 'Status is required.'
        if (!formData.date) newErrors.date = 'Date is required.'
        if (!formData.lead_manager) newErrors.lead_manager = 'Lead Manager is required.'


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (
            formData.email.trim() &&
            !emailPattern.test(formData.email.trim())
        ) {
            newErrors.email = 'Invalid email address.'
        }
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

    function closeAfter2000ms(type:string, message:string) {
        toast.push(
            <Notification closable type={type} duration={2000}>
                {message}
            </Notification>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const userId=localStorage.getItem('userId')
        if (validateForm()) {
            try {
                
                const formDataToSend = new FormData()
                console.log(formData);
                for (const key in formData) {
                    if (key !== 'files') {
                        formDataToSend.append(key, formData[key])
                    }
                }
                formDataToSend.append('userId', userId);
                
                console.log(formData);
                
                const response = await apiGetCrmCreateLead(formDataToSend)
                const errorMessage = await response.json()
                console.log(errorMessage.errorMessage);
                
                if (response.ok) {
                    closeAfter2000ms('success','Lead added successfully')
                    navigate('/app/leads')
                    window.location.reload()
                } else {
                    closeAfter2000ms('danger',errorMessage.errorMessage)
                }
            } catch (error) {
              closeAfter2000ms('danger',`Error: ${error}`)
            }
        }
        else {
            closeAfter2000ms('warning','Please check all the required fields')
        } 
    }
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-5">
                <div>
                    <FormItem label="Lead Name">
                        <Input
                            size="md"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                handleInputChange('name', e.target.value)
                            }
                        />
                    <span className=" text-red-600">{errors.name}</span>
                    </FormItem>
                </div>
                <div>
                    <FormItem label="Email">
                        <Input
                            size="md"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                handleInputChange('email', e.target.value)
                            }
                        />
                    <span className=" text-red-600">{errors.email}</span>
                    </FormItem>
                </div>
                <div>
                    <FormItem label="Phone">
                        <Input
                            size="md"
                            type="text"
                            value={formData.phone}
                            maxLength={10}
                            onChange={(e) =>{
                                const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                if (onlyNums.length <= 10) {
                                    handleInputChange('phone', onlyNums);
                                }
                            }
                            }
                        />
                    <span className=" text-red-600">{errors.phone}</span>
                    </FormItem>
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
                    <span className=" text-red-600">{errors.location}</span>
                    </FormItem>
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
                    <span className=" text-red-600">{errors.lead_manager}</span>
                    </FormItem>
                </div>
                <div>
                    <FormItem label="Lead Status">
                        <Select
                            options={options}
                            value={options.find(
                                (option) => option.value === formData.status,
                            )}
                            onChange={(selectedOption) =>
                              selectedOption && handleInputChange(
                                    'status',
                                    selectedOption.value,
                                )
                            }
                        />
                    <span className=" text-red-600">{errors.status}</span>
                    </FormItem>
                </div>
                <div>
                <FormItem label="Created Date">
                <DateTimepicker
    size='md'
    value={formData.date}
    format="DD-MM-YYYY HH:mm"
    onChange={handleDateChange}
/>
    <span className=" text-red-600">{errors.date}</span>
</FormItem>
                </div>
                <div>
                <FormItem label="Source">
                    <Select
                        options={optionsSource}
                        value={optionsSource.find(
                            (option) => option.value === formData.source,
                        )}
                        onChange={(selectedOption) =>
                            selectedOption && handleInputChange(
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
                            textArea
                            value={formData.content}
                            onChange={(e) =>
                                handleInputChange('content', e.target.value)
                            }
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
