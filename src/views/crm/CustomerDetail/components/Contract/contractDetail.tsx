
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
import { apiGetCrmFileManagerShareContractFile, apiGetCrmProjectShareContractApproval, apiGetCrmProjectShareQuotation, apiGetCrmProjectShareQuotationApproval } from '@/services/CrmService'
import { use } from 'i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import Textarea from '@/views/ui-components/forms/Input/Textarea'

type FormData = {
  user_name: string;
  file_id: string;
  folder_name: string;
  project_id: string;
  client_name: string;
  client_email: string;
  type: string;
};

const validationSchema = Yup.object({
    user_name: Yup.string().when('type', (type: string, schema) => {
      return type === 'Internal' ? schema.required('Required') : schema;
    }),
    client_name: Yup.string().when('type', (type: string, schema) => {
      return type === 'External' ? schema.required('Required') : schema;
    }),
    client_email: Yup.string().email('Invalid email address').when('type', (type: string, schema) => {
      return type === 'External'? schema.required('Required') : schema;
    }),
    type: Yup.string().required('Required'),
  });

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


const ContractDetails=(data : FileItemProps )=> {
    const [rowSelection, setRowSelection] = useState({})
    const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]); 
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [remark, setRemark] = useState("");
    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const leadId=queryParams.get('id')

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
    
        setIsOpen(false)
    }

    const Approval=async(fileID:string,status:string)=>{
        const postData = {
            lead_id:leadId ,
            file_id: fileID,
            status: status,
            remark: remark,
          };
        try{
            const response=await apiGetCrmProjectShareContractApproval(postData);
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
    console.log(data.data);
    
    const role = localStorage.getItem('role');
    const columns =
        useMemo <ColumnDef <FileItem >[] >
        (() => {
            return [
                {
                    header: 'File Name',
                    accessorKey: 'fileName',
                    cell:({row})=>{
                        const fileName=row.original.file_name;
                        return(
                            <a href={`${row.original.files[0].fileUrl}`} className=' cursor-pointer' target='_blank'>
                        <div>{fileName.length > 20 ? `${fileName.substring(0, 20)}...` : fileName}</div></a>)
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
                                role === 'designer' ? (
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
                                                initialValues={{ lead_id:leadId , file_id: fileId, status: 'rejected', remark: '' }}
                                                validationSchema={Yup.object({ remark: Yup.string().required('Required') })}
                                                onSubmit={async (values, { setSubmitting }) => {
                                                    const response = await apiGetCrmProjectShareContractApproval(values);
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
                                                        <Field name="remark"  component={Input}  />
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
                cell:({row})=>{
                    const Remark=row.original.remark;
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
                      <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
         <h3 className='mb-4'>Remarks</h3>
         <p style={{overflowWrap:"break-word"}}>{Remark}</p>
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
        email: string;
        file_id: string;
        type:string
        lead_id:string |null
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
    const handleShareFileForApproval = async () => {
        if(selectedFileIds.length===0){
          toast.push(
            <Notification closable type="warning" duration={2000}>
              Please select a file to share
            </Notification>,{placement:'top-center'}
          )
          return;
        }
      
    
        const postData = {
          type: 'Internal',
          file_id: selectedFileIds[0], 
          folder_name: 'quotation',
          lead_id: leadId,
        };
        try{
          const response=await apiGetCrmProjectShareQuotation(postData);
          const responseJson=await response.json()
          if (response.ok) {
            toast.push(
              <Notification closable type="success" duration={2000}>
                File shared successfully
              </Notification>,{placement:'top-center'}
            )
          }
        }
        catch(error){
          console.error('Error sharing files:', error);
        }
     }

     const SelectField: React.FC<SelectFieldProps> = ({ options, field, form }) => (
        <Select
            options={options}
            name={field.name}
            value={options ? options.find(option => option.value === field.value) : ''}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
        />
    );
    const handleSubmit = async (values:FormValues) => {
        const response=await apiGetCrmFileManagerShareContractFile(values);
        const responseData=  await response.json();
        
      };
     
    const navigate=useNavigate()
    const approvedFiles = data.data.filter(file => file.admin_status === 'approved').map(file => ({ value: file.itemId, label: file.file_name }));
    return (
        <div>
        <div className=' flex justify-end mb-4 gap-3'>
            <Button variant='solid' size='sm' onClick={()=>openDialog()} >Share to Client</Button>
            <Button variant='solid' size='sm' onClick={()=>navigate(`/app/crm/contract`)}>Contract</Button>
    </div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>

          
<Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                className={`pb-3`}>
                  <h3 className='mb-4'>Share To Client</h3>

                 <Formik
                 initialValues={{ client_name: '', email: '', file_id: '',type:'Client',lead_id:leadId,folder_name:'contract' }}
                 validationSchema={Yup.object({
                     client_name: Yup.string().required('Required'),
                     email: Yup.string().email('Invalid email address').required('Required'),
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
                    <Field name="email" type="text" component={Input}/>
                    </FormItem>
                    <FormItem label='File'>
                    <Field name="file_id" component={SelectField} options={approvedFiles}/>
                    </FormItem>
                    <Button type='submit' variant='solid'> Submit</Button>
                 </Form>  
                 </Formik>
                 
            </Dialog>
                
                    
        
        </div>
    )
}

export default ContractDetails

