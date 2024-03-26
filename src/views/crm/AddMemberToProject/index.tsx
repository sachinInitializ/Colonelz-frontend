import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { Button, FormItem, Input, Notification, Select, toast } from '@/components/ui';
import { apiAddMember } from '@/services/AuthService';
import { apiGetUsers } from '@/services/CommonService';

interface FormValues {
  role: string;
  user_name: string;
  project_id: string;
}

interface User {
  username: string;
  role: string;
}

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const Options = [
    { value: 'admin', label: 'Admin' },
    { value: 'designer', label: 'Designer' },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await apiGetUsers();
      setUsers(response.data);
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => user.role === selectedRole)
    );
  }, [selectedRole, users]);

  const handleSubmit = async (values: FormValues) => {
    const response=await apiAddMember(values);
    const responseData=  await response.json();
    if(response.status===200){
     
      toast.push(
        <Notification closable type="success" duration={0}>
            Member Added Successfully
        </Notification>
    
     )
      
    }
    else{
      toast.push(
        <Notification closable type="danger" duration={0}>
            {responseData.errorMessage}
        </Notification>
    
     )
      console.log(responseData);
      
    }
    console.log(responseData);
  };

  return (
    <Formik
      initialValues={{
        role: '',
        user_name: '',
        project_id: '',
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className='w-2/5'>
          <h3 className='mb-4'>Add Member To Project</h3>
          <FormItem label="Role">
            <Select
              options={Options}
              onChange={(option) => {
                setSelectedRole(option?.value || null);
                setFieldValue('role', option?.value || '');
              }}
            />
          </FormItem>
          <FormItem label="User Name">
            <Select
              options={filteredUsers.map((user) => ({ value: user.username, label: user.username }))}
              onChange={(option) => setFieldValue('user_name', option?.value || '')}
            />
          </FormItem>
          <FormItem label="Project Id">
            <Field id="project_id" name="project_id" component={Input} />
          </FormItem>

          <Button type="submit" variant='solid'>Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default Index;