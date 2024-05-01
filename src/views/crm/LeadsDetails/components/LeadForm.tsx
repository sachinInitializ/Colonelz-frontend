import React, { useState, ChangeEvent, FormEvent } from 'react';
import ValueType from 'react-select';
import { Button, Card, Dialog, FormContainer, FormItem, Input, Notification, Select, toast } from '@/components/ui';
import type { MouseEvent } from 'react'
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker';
import Cookies from 'js-cookie';
import { apiGetCrmLeadsUpdates } from '@/services/CrmService';
import { useLocation } from 'react-router-dom';

interface FormData {
  userId: string;
  lead_id: string | null;
  status: string;
  date: Date | null;
  content: string;
  createdBy: string;
}

type CustomerInfoFieldProps = {
  title?: string
  value?: string
}



type CustomerProfileProps = {
  data?: Partial<Customer>
}

type Customer = {
  _id: string
  name: string
  lead_id:string
  email:string
  phone:string
  location:string
  status:string
  source:string
  notes?: Note[];
}

interface Note {
  _id: string;
  content: string;
  createdBy: string;
  date: string;
  status: string;
}

const YourFormComponent: React.FC<CustomerProfileProps> = ({data}) => {
  const location = useLocation()
const queryParams = new URLSearchParams(location.search)
const myParam = queryParams.get('id') || ''
  const initialFormData: FormData = {
    userId: localStorage.getItem('userId') || '',
    lead_id: myParam,
    status: '',
    date: null,
    content: '',
    createdBy: 'Client',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const statusOptions = [
    { value: 'No Response', label: 'No Response' },
    { value: 'Not Interested', label: 'Not Interested' },
    { value: 'Follow Up', label: 'Follow Up' },
    { value: 'Interested', label: 'Interested' },
  ];

  const handleStatusChange = (selectedOption: ValueType<{ value: string; label: string }>) => {
    setSelectedStatus(selectedOption);
    setFormData({
      ...formData,
      status: selectedOption ? (selectedOption as { value: string; label: string }).value : '',
    });
    setErrors({
      ...errors,
      status: '',
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    
    setFormData({ ...formData, date });
    setErrors({
      ...errors,
      date: '',
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const token=Cookies.get('auth')

  function closeAfter2000ms(type:string, message:string) {
    toast.push(
        <Notification closable type={type} duration={2000}>
            {message}
        </Notification>
    )
}

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors: { [key: string]: string } = {};
    if (!selectedStatus) {
      validationErrors.status = 'Status is required';
    }
    if (!formData.date) {
      validationErrors.date = 'Date is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await apiGetCrmLeadsUpdates(formData)
      const errorMessage = await response.json()
      if (response.ok) {
          closeAfter2000ms('success','Lead Updated successfully')
          window.location.reload()
      } else {
          closeAfter2000ms('danger',errorMessage.errorMessage)
      }
  } catch (error) {
    closeAfter2000ms('danger',`Error: ${error}`)
  }
  };

  const [dialogIsOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = (e: MouseEvent) => {
    setIsOpen(false);
  };

  const onDialogOk = (e: MouseEvent) => {
    setIsOpen(false);
  };

  const CustomerInfoField = ({ title, value }: CustomerInfoFieldProps) => {
    return (
      <div>
        <span>{title}</span>
        <p className="text-gray-700 dark:text-gray-200 font-semibold">
          {value}
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h5>Actions</h5>
        <Button variant='solid' onClick={() => openDialog()} >View Last Update</Button>
      </div>
      <form onSubmit={handleFormSubmit}>
        <FormContainer>
          <div className='grid grid-cols-3 gap-5'>
            <FormItem>
             Lead Status:
              <Select
                value={selectedStatus}
                options={statusOptions}
                onChange={handleStatusChange}
              />
              {errors.status && <span className="text-red-500">{errors.status}</span>}
            </FormItem>

            <FormItem>
              Date:
              <DateTimepicker
    size='md'
    value={formData.date}
    format="DD-MM-YYYY HH:mm"
    onChange={handleDateChange}
/>
              {errors.date && <span className="text-red-500">{errors.date}</span>}
            </FormItem>
          </div>
          <div className='flex justify-between items-center '>
            <FormItem
              label="Description:"
              labelClass="!justify-start"
              className='w-2/3'
            >
              <Input
                textArea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
              />
            </FormItem>
            <Button
              size="sm"
              variant="solid"
              type="submit"
              className=''
            >
              Submit
            </Button>
          </div>
        </FormContainer>
      </form>

      <Dialog
        isOpen={dialogIsOpen}
        width={1000}
        height={490}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <div style={{ maxHeight: '400px', overflowY: 'auto', marginRight:"2%", marginLeft:"1%", scrollbarWidth:'none'  }} className='scrollbar-hide  whitespace-nowrap'>
          {data?.notes?.map((note) => (
            <div key={note._id} className='mb-4 mr-4'>
              <Card>
                <div className='flex flex-row justify-between items-center mb-4 '>
                  <CustomerInfoField title="Date"
                    value={note?.date ? new Date(note.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-') : ''}
                   />
                  <CustomerInfoField title="Lead Status" value={note.status} />
                </div>
                <div>
                  <p>Description</p>
                  <p className='text-gray-700 dark:text-gray-200 font-semibold text-wrap'>{note.content}</p>
                </div>
              </Card>
            </div>
          ))}
          <div className="text-right mt-6 mb-4 mr-[2%]">
            <Button variant="solid" onClick={onDialogOk}>
              Okay
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default YourFormComponent;
