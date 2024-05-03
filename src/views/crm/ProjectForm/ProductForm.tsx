import React, { useState, ChangeEvent, FormEvent } from 'react';
import ValueType from 'react-select';
import { Button, FormContainer, FormItem, Input, Notification, Select, toast } from '@/components/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import { StickyFooter } from '@/components/shared';
import { apiGetCrmCreateLeadToProject } from '@/services/CrmService';

interface FormData {
  lead_id: string | null;
  status: string;
  content: string;
  createdBy: string;
  client_name: string;
  client_email: string;
  client_contact: string;
  location: string;
  designer:string;
  description: string;
  project_type: string;
  project_name: string;
  project_status:string;
  timeline_date:Date | null;
  project_budget:string;
  project_start_date:Date | null;
}

interface CustomerProfileProps {
  data?: Partial<Customer>;
}

type Customer = {
  _id: string;
  name: string;
  lead_id: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  source: string;
  notes: string[];
};

const YourFormComponent: React.FC<CustomerProfileProps> = ({ data }) => {
    interface QueryParams {
        id: string;
        name: string;
        email: string;
        phone: string;
        location: string;
      }
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Create an object to store and map the query parameters
    const allQueryParams: QueryParams = {
      id: queryParams.get('id') || '',
      name: queryParams.get('name') || '',
      email: queryParams.get('email') || '',
      phone: queryParams.get('phone') || '',
      location: queryParams.get('location') || '',
    };

  const initialFormData: FormData = {
    lead_id: allQueryParams.id,
    status: '',
    content: '',
    createdBy: 'Client',
    client_name: allQueryParams.name,
    client_email: allQueryParams.email,
    client_contact: allQueryParams.phone,
    location: allQueryParams.location,
    designer:'',
    description: '',
    project_type: '',
    project_name: '',
    project_status:'',
    project_start_date: null,
    timeline_date:null ,
    project_budget:'',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const projectTypeOptions = [
    { value: 'commercial', label: 'Commercial' },
    { value: 'residential', label: 'Residential' },
  ];
  const projectStatusOptions = [
    { value: 'designing', label: 'Designing' },
    { value: 'executing', label: 'Executing' },
  ];


  const handleDateChange = (date: Date | null, fieldName: string) => {
    setFormData({
        ...formData,
        [fieldName]: date ? `${date}` : null,
    })
    setErrors({
        ...errors,
        date: '',
    })
}

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name==='client_contact'){
      const onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length <= 10) {
          setFormData({ ...formData, [name]: onlyNums });
      }
    }
    else {
      setFormData({ ...formData, [name]: value });
  }
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  function closeAfter2000ms(type:string, message:string) {
    toast.push(
        <Notification closable type={type} duration={2000}>
            {message}
        </Notification>
    )
}

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors: { [key: string]: string } = {};

   
    if (!formData.client_name.trim()) {
      validationErrors.client_name = "Client's Name is required";
    }
    if (!formData.client_email.trim() || !/^\S+@\S+\.\S+$/.test(formData.client_email.trim())) {
      validationErrors.client_email = 'Valid email is required';
    }
    if (!formData.client_contact.trim() || !/^\d{10}$/.test(formData.client_contact.trim())) {
      validationErrors.client_contact = 'Valid 10-digit contact number is required';
    }
    if (!formData.location.trim()) {
      validationErrors.location = 'Location is required';
    }
    if (!formData.designer.trim()) {
      validationErrors.designer = 'Project Incharge is required';
    }
    
    if (!formData.project_type.trim()) {
      validationErrors.project_type = 'Project Type is required';
    }
  
    if (!formData.project_name.trim()) {
      validationErrors.project_name = 'Project Name is required';
    }
    if (!formData.project_budget.trim()) {
      validationErrors.project_budget = 'Project Budget is required';
    }
    if (!formData.project_status.trim()) {
      validationErrors.project_status = 'Project Status is required';
    }
    if (!formData.project_start_date) {
      validationErrors.project_start_date = 'Project Start Date is required';
    }
    
    if (!formData.timeline_date) {
      validationErrors.timeline_date = 'Timeline Date is required';
    }

    if (formData.timeline_date && formData.project_start_date) {
      const startDate = new Date(formData.project_start_date);
      const endDate = new Date(formData.timeline_date);
    
      if (endDate <= startDate) {
        validationErrors.timeline_date = 'Timeline Date must be greater than Project Start Date';
      }
    }
   
  
    if (Object.keys(validationErrors).length > 0) {
      console.log(formData);
      
      closeAfter2000ms('warning', 'Please fill in the required fields');
      setErrors(validationErrors);
      return;
    }
console.log(formData);

    try {
      const response = await apiGetCrmCreateLeadToProject(formData);

      if (response.ok) {
        closeAfter2000ms('success', 'Project created successfully');
        navigate("/app/crm/projectslist");
        window.location.reload()
      } else {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.errorMessage || 'Unknown error';
       closeAfter2000ms('danger', errorMessage);
      }
    } catch (error) {
      // Handle any other errors
      console.error('Error:', error);
     closeAfter2000ms('danger', 'An error occurred');
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center max-sm:flex-col mb-6'>
      </div>
      <form onSubmit={handleFormSubmit}>
        <FormContainer>
         
          
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 xl:grid-cols-3 '>
            <FormItem label="Client's Name" className=''>
              <Input name='client_name' value={formData.client_name} onChange={handleInputChange} />
              {errors.client_name && <span className='text-red-500'>{errors.client_name}</span>}
            </FormItem>
            <FormItem label='Client Email' className=''>
              <Input name='client_email' value={formData.client_email} onChange={handleInputChange} />
              {errors.client_email && <span className='text-red-500'>{errors.client_email}</span>}
            </FormItem>
            <FormItem label='Client Contact' className=''>
              <Input name='client_contact' value={formData.client_contact} onChange={handleInputChange} />
              {errors.client_contact && <span className='text-red-500'>{errors.client_contact}</span>}
            </FormItem>
            <FormItem label='Project Name' className=''>
              <Input name='project_name' value={formData.project_name} onChange={handleInputChange} />
              {errors.project_name && <span className='text-red-500'>{errors.project_name}</span>}
            </FormItem>
            <FormItem label='Location' className=''>
              <Input name='location' value={formData.location} onChange={handleInputChange} />
              {errors.location && <span className='text-red-500'>{errors.location}</span>}
            </FormItem>
            <FormItem label='Project Incharge' className=''>
              <Input name='designer' value={formData.designer} onChange={handleInputChange} />
              {errors.designer && <span className='text-red-500'>{errors.designer}</span>}
            </FormItem>
            <FormItem label='Project Budget' className=''>
              <Input name='project_budget' value={formData.project_budget} onChange={handleInputChange} />
              {errors.project_budget && <span className='text-red-500'>{errors.project_budget}</span>}
            </FormItem>
            <FormItem label='Project Type' className=''>
            <Select
                options={projectTypeOptions}
                value={projectTypeOptions.find((option) => option.value === formData.project_type)}
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    project_type: selectedOption ? (selectedOption as { value: string; label: string }).value : '',
                  });
                  setErrors({
                    ...errors,
                    project_type: '',
                  });
                }}
              />
              {errors.project_type && <span className='text-red-500'>{errors.project_type}</span>}
            </FormItem>
            <FormItem label='Project Status' className=''>
            <Select
                options={projectStatusOptions}
                value={projectStatusOptions.find((option) => option.value === formData.project_status)}
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    project_status: selectedOption ? (selectedOption as { value: string; label: string }).value : '',
                  });
                  setErrors({
                    ...errors,
                    project_status: '',
                  });
                }}
              />
              {errors.project_status && <span className='text-red-500'>{errors.project_status}</span>}
            </FormItem>

            <FormItem label="Project Start Date">
    <DatePicker
        size="md"
        onChange={(date) =>
            handleDateChange(date, 'project_start_date')
        }
    />
    {errors.project_start_date && (
        <span className="text-red-500">
            {errors.project_start_date}
        </span>
    )}
</FormItem>
<FormItem label="Timeline Date">
    <DatePicker
        size="md"
        onChange={(date) =>
            handleDateChange(date, 'timeline_date')
        }
    />
    {errors.timeline_date && (
        <span className="text-red-500">
            {errors.timeline_date}
        </span>
    )}
</FormItem>
       
            <FormItem label='Description' className=''>
              <Input
              textArea 
              name='description' 
              value={formData.description} 
              onChange={handleInputChange} 
              />
            </FormItem>
           
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
        </FormContainer>
      </form>
    </div>
  );
};

export default YourFormComponent;
