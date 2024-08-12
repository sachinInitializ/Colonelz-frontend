import { RichTextEditor } from '@/components/shared';
import { Button, Dialog, FormItem, Notification, Select, toast } from '@/components/ui';
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker';
import { apiGetCrmLeadsUpdates } from '@/services/CrmService';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';

interface FormData {
  userId: string;
  lead_id: string | null;
  status: string;
  date: Date | null;
  content: string;
  createdBy: string;
}

const LeadForm = () => {
  const location=useLocation()
  const queryParams = new URLSearchParams(location.search)
  const LeadId = queryParams.get('id') || ''


  const statusOptions = [
    { value: 'No Response', label: 'No Response' },
    { value: 'Not Contacted', label: 'Not Contacted' },
    { value: 'Follow Up', label: 'Follow Up' },
    { value: 'Interested', label: 'Interested' },
    { value: 'Inactive', label: 'Inactive' },
  ];


  return (
    <>
   <h3 className='mb-3' >Add Follow-Up</h3>
    
  <Formik initialValues={{
    userId: localStorage.getItem('userId') || '',
    lead_id: LeadId,
    status: '',
    date: null,
    content: '',
    createdBy: 'ADMIN'
  }}
  validationSchema={Yup.object().shape({
    status: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
  })}
  
  onSubmit={async(values:any,{setSubmitting}) => {
    setSubmitting(true)
    console.log(values);
    
    const response=await apiGetCrmLeadsUpdates(values)
    if(response.code===200){
      
      toast.push(
        <Notification type='success' duration={2000} closable>
          Lead Updated Successfully
        </Notification>
      )
      window.location.reload()
    }
    else{
      toast.push(
        <Notification type='danger' duration={2000} closable>
          Error Updating Lead
        </Notification>
      )
    }
    setSubmitting(false)
    
  }
  }
  >
    {({values,isSubmitting,errors}) => (
      
    <Form className='max-h-96 overflow-y-auto'>
    <FormItem label='Lead Status'
    asterisk
    >
      <Field>
      {({field,form}:any) => (
       <Select
       options={statusOptions}
        onChange={(value) => form.setFieldValue('status', value?.value)}
       />
      )}
      </Field>
    </FormItem>


    <FormItem label='Date'
    asterisk>
      <Field>
      {({field,form}:any) => (
      <DateTimepicker
      onChange={(date) => form.setFieldValue('date', date)}
      />
      )}
      </Field>
    </FormItem>


    <FormItem label='Description'>
      <Field>
      {({field,form}:any) => (
      <RichTextEditor
      onChange={(content) => form.setFieldValue('content', content)}
      />
      )}
      </Field>
    </FormItem>
    <Button variant='solid' block loading={isSubmitting}>{isSubmitting?'Submitting...':"Submit"}</Button>
    </Form>
    )}
  </Formik>
  
  </>
  )
}

export default LeadForm