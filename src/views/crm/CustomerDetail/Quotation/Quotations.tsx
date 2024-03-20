
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
import { Button, Dialog, Input, Notification, toast } from '@/components/ui'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { apiGetCrmProjectShareQuotationApproval } from '@/services/CrmService'
import { use } from 'i18next'
import { useLocation } from 'react-router-dom'

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


const Quotations=(data : FileItemProps )=> {
    const [rowSelection, setRowSelection] = useState({})
    const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]); 
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [remark, setRemark] = useState("");
    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const projectId=queryParams.get('project_id')
    const [fileId,setFileId]=useState('')

    const openDialog = (file_id:string) => {
        setIsOpen(true)
        setFileId(file_id)
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
    

    const columns =
        useMemo <ColumnDef <FileItem >[] >
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
                            ):(<div>Not Sent</div>)
                        )
                    }
                    
                },
                {
                    header: 'Admin Status',
                    accessorKey: 'itemId',
                    cell:({row})=>{
                        const fileId=row.original.itemId;
                        const status=row.original.admin_status;
                        return(
                            status==='approved'?(
                                <div>Approved</div>
                            ):status==='rejected'?(
                                <div>Rejected</div>
                            ):status==='pending'?(
                                <div className='flex gap-1'>
                                <Button variant='solid' size='sm' onClick={()=>Approval(fileId,'approved')}>Accept</Button>
                                <Button variant='solid' color='red-600' size='sm' onClick={()=>openDialog(fileId)}>Reject</Button>
                                </div>
                            ):(
                                <div>Not Sent</div>
                            )
                        )
                    }
                }
              
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

    return (
        <div>
        <div className=' flex justify-end mb-4'>
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
                    <div className='h-[100%] overflow-auto pb-3' style={{scrollbarWidth:'none'}}>
                    <h3 className='mb-5'>Remark</h3>
                    <Input
  textArea
  value={remark}
  onChange={(e) => setRemark(e.target.value)}
/>
                    <div className='flex justify-end'>
                        <Button variant='solid' size='sm' onClick={()=>Approval(fileId,'rejected')}>Submit</Button>
                    </div>
                    
    </div>
                    
            </Dialog>
        </div>
    )
}

export default Quotations

