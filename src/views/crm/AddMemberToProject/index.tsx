import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { Button, FormItem, Input, Notification, Select, toast } from '@/components/ui';
import { apiAddMember } from '@/services/AuthService';
import { apiGetUsers } from '@/services/CommonService';
import { apiGetProjectList } from '@/services/ProjectService1';
import { apiGetCrmProjects } from '@/services/ProjectService';
import { set } from 'lodash';

interface FormValues {
  id: string;
  role: string;
  user_name: string;
  project_id: string;
}

interface User {
  username: string;
  role: string;
}
interface Projects {
  project_id: string;
  project_name: string;
}
const response = await apiGetUsers();
const projects = await apiGetCrmProjects();
const id=localStorage.getItem('userId');
const token=localStorage.getItem('auth');
const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Projects[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const Options = [
    { value: '3D Visualizer', label: '3D Visualizer' },
    { value: 'Jr. Interior Designer', label: 'Jr. Interior Designer' },
    { label: 'Executive Assistant', value: 'Executive Assistant' },
    { value: 'Project Architect', label: 'Project Architect' },
    { label: 'Jr. Executive HR & Marketing', value: 'Jr. Executive HR & Marketing' },
    { label: 'Site Supervisor', value: 'Site Supervisor' }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(response.data);
      setSelectedProject(projects.data.projects);
    };

    fetchUsers();
  },[]);
  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => user.role === selectedRole)
    );
    setFilteredProjects(
      projects.data.projects
    );
  }, [selectedRole, users]);

  const handleSubmit = async (values: FormValues) => {
    const response=await apiAddMember(values,token);
    const responseData=  await response.json();
    if(response.status===200){
     
      toast.push(
        <Notification closable type="success" duration={2000}>
            Member Added Successfully
        </Notification>
    
     )
      
    }
    else{
      toast.push(
        <Notification closable type="danger" duration={2000}>
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
        id:id || '',
        role: '',
        user_name: '',
        project_id: '',
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className='w-2/5'>
          <h3 className='mb-4'>Add User To Project</h3>
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
          <FormItem label="Project">
          <Select
              options={filteredProjects.map((project) => ({ value: project.project_id, label: project.project_name }))}
              onChange={(option) => setFieldValue('project_id', option?.value || '')}
            />
          </FormItem>

          <Button type="submit" variant='solid'>Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default Index;