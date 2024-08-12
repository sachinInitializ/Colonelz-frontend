import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Selector from './Selector'; // Adjust import path as necessary
import { Button } from '@/components/ui';
import useQuery from '@/utils/hooks/useQuery';
import { apiEditRoles, apiGetRoleDetails } from '@/services/CommonService';

type Permission = 'create' | 'read' | 'update' | 'delete';
type AccessType = 'lead' | 'user' | 'project' | 'task' | 'contract' | 'quotation' | 'file' | 'archive' | 'mom' | 'addMember' | 'role';

type AccessPermissions = Permission[];

type FormValues = {
    [key in AccessType]: AccessPermissions;
};

const accessTypes: AccessType[] = [
    'lead', 'user', 'project', 'task', 'contract', 'quotation', 'file', 'archive', 'mom', 'addMember', 'role'
];

const validationSchema = Yup.object().shape(
    accessTypes.reduce((acc, type) => {
        acc[type] = Yup.array().of(Yup.string().oneOf(['create', 'read', 'update', 'delete']));
        return acc;
    }, {} as any)
);

const EditRoles = () => {
    const query = useQuery();
    const role = query.get('role');
    const id = query.get('id');
    const [initialValues, setInitialValues] = useState<FormValues>(() =>
        accessTypes.reduce((acc, type) => {
            acc[type] = [];
            return acc;
        }, {} as FormValues)
    );
    console.log('initialValues', initialValues);
    
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const response = await apiGetRoleDetails();
                if (response && response.data) {
                    const roleData = response.data.find((r: any) => r._id === id);
                    if (roleData && roleData.access) { // Ensure roleData and roleData.access are defined
                        const newInitialValues = accessTypes.reduce((acc, type) => {
                            acc[type] = roleData.access[type] || []; // Default to empty array if the type is undefined
                            return acc;
                        }, {} as FormValues);
                        setInitialValues(newInitialValues);
                    } else {
                        // If access is undefined, initialize all access types to empty arrays
                        const emptyInitialValues = accessTypes.reduce((acc, type) => {
                            acc[type] = [];
                            return acc;
                        }, {} as FormValues);
                        setInitialValues(emptyInitialValues);
                    }
                }
            }
        };
        fetchData();
    }, [id]);
    
    

    const handleSubmit = async (values: FormValues) => {
        console.log(values);      
        const access = Object.keys(values).reduce((acc, key) => {
            const permissions = values[key as AccessType];
            if (permissions.length > 0) {
                acc[key as AccessType] = permissions; 
            }
            return acc;
        }, {} as { [key in AccessType]?: AccessPermissions });
    
        const payload = {
            role,
            access
        };
        console.log('payload', payload);
        
    
        const response = await apiEditRoles(payload, id);
        const data=await response.json()
        console.log(data);
    };
    

    return (
        <div className='p-6'>
            <h3>Edit Role</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
             onSubmit={(values,{setSubmitting}) =>{
                 console.log(values);
                 handleSubmit(values)
                 setSubmitting(false)
                 
                
             }}

            >
                {({ isSubmitting }) => (
                    <Form>
                        {accessTypes.map((type) => (
                            <div
                                key={type}
                                className='grid md:grid-cols-4 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center'
                            >
                                <div className="font-semibold">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                                <div className='flex gap-2'>
                                    <Field name={type}>
                                        {({ field, form }: any) => (
                                            <Selector field={field} form={form} />
                                        )}
                                    </Field>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 ltr:text-right">
                            <Button
                                variant="solid"
                                loading={isSubmitting}
                                type="submit"
                            >
                                {isSubmitting ? 'Updating' : 'Update'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditRoles;
