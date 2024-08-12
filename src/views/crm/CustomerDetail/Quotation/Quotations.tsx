
import { useRef, useEffect, useMemo, useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Table from '@/components/ui/Table'
import Checkbox from '@/components/ui/Checkbox'
import type { ChangeEvent } from 'react'
import type { CheckboxProps } from '@/components/ui/Checkbox'
import type { ColumnDef } from '@tanstack/react-table'
import { Button, Dialog, FormItem, Input, Notification, Select, toast } from '@/components/ui'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { apiGetCrmProjectShareQuotation, apiGetCrmProjectShareQuotationApproval } from '@/services/CrmService'
import { use } from 'i18next'
import { useLocation } from 'react-router-dom'
import NoData from '@/views/pages/NoData'
import { useRoleContext } from '../../Roles/RolesContext'
import { AuthorityCheck } from '@/components/shared'

type FormData = {
  user_name: string;
  file_id: string;
  folder_name: string;
  project_id: string;
  client_name: string;
  client_email: string;
  type: string;
};


type CheckBoxChangeEvent = ChangeEvent<HTMLInputElement>

interface IndeterminateCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
    onChange: (event: CheckBoxChangeEvent) => void;
    indeterminate: boolean;
    onCheckBoxChange?: (event: CheckBoxChangeEvent) => void;
    onIndeterminateCheckBoxChange?: (event: CheckBoxChangeEvent) => void;
}

const { Tr, Th, Td, THead, TBody } = Table

export type FileItemProps = {
    data:FileItem[]
}
type FileItem = {
   admin_status:string,
   client_status:string,   
   file_name:string,
   files:Files[],
   itemId:string,
   remark:string
}
type Files = {
    fileUrl:string,
}
type RowType = {
    original: {
      remark: string;
      admin_status: string;
      client_remark: string;
    };
  };

function IndeterminateCheckbox({
    indeterminate,
    onChange,
    ...rest
}: IndeterminateCheckboxProps) {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (typeof indeterminate === 'boolean' && ref.current) {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return <Checkbox ref={ref} onChange={(_, e) => onChange(e)} {...rest} />
}


const Quotations=(data : FileItemProps )=> {
    const [rowSelection, setRowSelection] = useState({})
    const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]); 
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [remark, setRemark] = useState("");
    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const projectId=queryParams.get('project_id')
    const [submit,setSubmit]=useState(false)
    const {roleData} = useRoleContext()

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
    
        setIsOpen(false)
    }

    const Approval=async(fileID:string,status:string)=>{
        const postData = {
            project_id:projectId ,
            file_id: fileID,
            status: status,
            remark: remark,
          };
        try{
            const response=await apiGetCrmProjectShareQuotationApproval(postData);
            const responseData=await response.json();
            if(response.status===200){
                toast.push(
                    <Notification closable type='success' duration={2000}>
                        {responseData.message}
                    </Notification>
                )
                window.location.reload();
            }
        }
        catch(error){
            toast.push(
                <Notification closable type='danger' duration={2000}>
                    Error
                </Notification>
            )
        }
    }
    
    const role = localStorage.getItem('role');
    const columns =
        useMemo <ColumnDef <any >[] >
        (() => {
            return [
                {
                    header: 'File Name',
                    accessorKey: 'firstName',
                    cell:({row})=>{
                        const fileName=row.original.file_name;
                        return(
                            <a href={`${row.original.files[0].fileUrl}`} className=' cursor-pointer' target='_blank'>
                        <div>{fileName.length > 20 ? `${fileName.substring(0, 20)}...` : fileName}</div></a>)
                    }
                },
               
                {
                    header: 'Client Status',
                    accessorKey: 'client_status',
                    cell:({row})=>{
                        const status=row.original.client_status;
                        return(
                            status==='approved'?(
                                <div>Approved</div>
                            ):status==='rejected'?(
                                <div>Rejected</div>
                            ):status==='pending'?(
                                <div>Pending</div>

                            ):status==='amended'?(
                                <div>Amendment</div>
                            ):
                            (<div>Not Sent</div>)
                        )
                    }
                    
                },
               {
                    header: 'Admin Status',
                    accessorKey: 'itemId',
                    cell:({row})=>{
                        const fileId=row.original.itemId;
                        const status=row.original.admin_status;
                        const [dialogIsOpen, setIsOpen] = useState(false)
                       

                        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                            setRemark(event.target.value);
                        };

                        const openDialog1 = (fileId:string) => {
                            setIsOpen(true)
                        }
                    
                        const onDialogClose1 = () => {
                            setIsOpen(false)
                        }
                    
                        return(
                            status==='approved'?(
                                <div>Approved</div>
                            ):status==='rejected'?(
                                <div>Rejected</div>
                            ):status==='pending'?
                            (
                                roleData.data.quotation?.update?.includes(role || '') ? (
                                    <div>Pending</div>
                                ) : (
                                    <div className='flex gap-1'>
                                        <Button variant='solid' size='sm' onClick={()=>Approval(fileId,'approved')}>Accept</Button>
                                        <Button variant='solid' color='red-600' size='sm' onClick={()=>openDialog1(fileId)}>Reject</Button>
                                        <Dialog
                                            isOpen={dialogIsOpen}
                                            onClose={onDialogClose1}
                                            onRequestClose={onDialogClose1}
                                        >
                                            <h3 className='mb-4'> Reject Remarks</h3>
                                            <Formik
                                                initialValues={{ project_id:projectId , file_id: fileId, status: 'rejected', remark: '' }}
                                                validationSchema={Yup.object({ remark: Yup.string().required('Required') })}
                                                onSubmit={async (values, { setSubmitting }) => {
                                                    console.log(values);
                                                    
                                                    const response = await apiGetCrmProjectShareQuotationApproval(values);
                                                    const responseData=await response.json();
                                                    if(response.status===200){
                                                        toast.push(
                                                            <Notification closable type='success' duration={2000}>
                                                                {responseData.message}
                                                            </Notification>
                                                        )
                                                        window.location.reload();
                                                    }
                                                    else{
                                                        toast.push(
                                                            <Notification closable type='danger' duration={2000}>
                                                                {responseData.errorMessage}
                                                            </Notification>
                                                        )
                                                    }
                                                    
                                                    setSubmitting(false);
                                                }}
                                            >
                                                <Form>
                                                <FormItem label="Remark">
                                                    <Field name="remark">
                                                    {({ field }:any) => (
                                                        <Input {...field} textArea />
                                                    )}
                                                    </Field>
                                                </FormItem>
                                                    <div className='flex justify-end'>
                                                        <Button type="submit" variant='solid'>Submit</Button>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </Dialog>
                                    </div>
                                )
                            ):(
                                <div>Not Sent</div>
                            )
                        )
                    }
               }
                ,
                ...(role !== 'designer' ? [{
                header: 'Remark',
                accessorKey: 'remark',
                cell: ({row}: {row: RowType}) => {
                    const Remark=row.original.remark;
                    const clientRemark=row.original.client_remark;
                    const admin_status=row.original.admin_status;
                    const [dialogIsOpen, setIsOpen] = useState(false)

                    const openDialog = () => {
                        setIsOpen(true)
                    }
                
                    const onDialogClose = () => {
                        setIsOpen(false)
                    }
                
                    const onDialogOk = (e: MouseEvent) => {
                        console.log('onDialogOk', e)
                        setIsOpen(false)
                    }
                    return(<> 
                    {admin_status==='rejected' &&        
                      <div><Button size='sm' variant='solid' onClick={()=>openDialog()}>Remark</Button></div>}
                    {admin_status==='approved' &&  clientRemark.length>0 &&     
                      <div><Button size='sm' variant='solid' onClick={()=>openDialog()}>Client Remark</Button></div>}

                      <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
         <h3 className='mb-4'>{Remark.length>0?'Remark':'Client Remark'
            }</h3>
         <p style={{overflowWrap:"break-word"}}>
            {Remark.length>0?<div className=' break-words'>{Remark}</div>:<div className=' break-words'>{clientRemark}</div>}
         
         </p>
                      </Dialog>
                      </>

                    )
              }
            }] : [])
            ]
        },
        [])

    const table = useReactTable({
        data:data?.data || [],
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true, 
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
  console.log(data.data);
  
    interface FormValues {
        client_name: string;
        client_email: string;
        file_id: string;
        type:string
        project_id:string |null
        folder_name:string
    }
    interface Option {
        value: string ;
        label: string;
    }
    
    interface SelectFieldProps {
        options: Option[];
        field: any;
        form: any;
    }
   

     const SelectField: React.FC<SelectFieldProps> = ({ options, field, form }) => (
        <Select
            options={options}
            name={field.name}
            value={options ? options.find(option => option.value === field.value) : ''}
            onChange={(option) => {
                if (option && typeof option !== 'string') {
                  form.setFieldValue(field.name, option.value);
                }
              }}
        />
    );
    const handleSubmit = async (values:FormValues) => {
        setSubmit(true);
        const response=await apiGetCrmProjectShareQuotation(values);
        const responseData=  await response.json();
        setSubmit(false);
        if(responseData.code===200){
            toast.push(
                <Notification closable type="success" duration={2000}>
                   {responseData.message}
                </Notification>
            )
        }
        else{
            toast.push(
                <Notification closable type="danger" duration={2000}>
                   {responseData.errorMessage}
                </Notification>
            )
        }
        console.log(responseData);
      };
     const approvedFiles = data.data.filter(file => file.admin_status === 'approved').map(file => ({ value: file.itemId, label: file.file_name }));

    return (
        <div>
        <div className=' flex justify-end mb-4'>
        <AuthorityCheck
                    userAuthority={[`${localStorage.getItem('role')}`]}
                    authority={roleData?.data?.quotation?.update??[]}
                    >
            <Button variant='solid' size='sm' onClick={()=>openDialog()} >Share to Client</Button>
            </AuthorityCheck>
    </div>
    {table.getRowModel().rows.length > 0 ? (
    <Table>
        <THead>
            {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <Th key={header.id} colSpan={header.colSpan}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </Th>
                    ))}
                </Tr>
            ))}
        </THead>
        <TBody>
            {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <Td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Td>
                    ))}
                </Tr>
            ))}
        </TBody>
    </Table>
) : (
    <div style={{ textAlign: 'center'}  }><NoData/></div>
)}

          
<Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                className={`pb-3`}>
                  <h3 className='mb-4'>Share To Client</h3>

                 <Formik
                 initialValues={{ client_name: '', client_email: '', file_id: '',type:'Client',project_id:projectId,folder_name:'quotation',user_id:localStorage.getItem('userId') }}
                 validationSchema={Yup.object({
                     client_name: Yup.string().required('Required'),
                     client_email: Yup.string().email('Invalid email address').required('Required'),
                     file_id: Yup.string().required('Required'),
                 })}
                 onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values);
                        setSubmitting(false);
                 }}
                 >
                    <Form>
                 <FormItem label='Client Name'>
                 <Field name="client_name" type="text" component={Input}/>
                 </FormItem>
                    <FormItem label='Client Email'>
                    <Field name="client_email" type="text" component={Input}/>
                    </FormItem>
                    <FormItem label='File'>
                    <Field name="file_id" component={SelectField} options={approvedFiles}/>
                    </FormItem>
                    <Button type='submit' variant='solid' loading={submit}> {submit?'Submitting':'Submit'}</Button>
                 </Form>  
                 </Formik>
                 
            </Dialog>
                
                    
        
        </div>
    )
}

export default Quotations

