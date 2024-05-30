
import { useState, useMemo, useEffect } from 'react'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { DataItem } from '../Store/ArchiveSlice'
import { apiGetCrmFileManagerArchive } from '@/services/CrmService'
import { FiDelete } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'

type Person = {
    firstName: string
    lastName: string
    age: number
}

type Option = {
    value: number
    label: string
}

const { Tr, Th, Td, THead, TBody } = Table




const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
]

const PaginationTable = () => {
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
        const year = date.getFullYear()
      
        return `${day}-${month}-${year}`
      }
    const columns = useMemo<ColumnDef<DataItem>[]>(
        () => [
            {
                header: 'Name',
                accessorKey: 'firstName',
                cell: ({row}) => {
                    const file = row.original.files && row.original.files[0];
                    const fileName = file && file.fileName;
                    const folderName = file && file.folder_name;
                    const subfolderName = file && file.sub_folder_name_second;
                    return(
                        <div>{(fileName && fileName.length>20?fileName.slice(0,20):fileName) || folderName || subfolderName}</div>
                    )
                }

            },
            {
                header: 'Type',
                cell: ({row}) => {
                    const file = row.original.files && row.original.files[0];
                    const fileName = file && file.fileName;
                    return(
                        <div>{fileName ? 'file' : 'folder'}</div>
                    )
                }
            },
            {
                header: 'Date Deleted',
                accessorKey: 'created_at',
                cell: ({row}) => {
                    const date=row.original.created_at
                    return(
                        <div>{formatDate(date)}</div>
                    )
                }
            },
            
            {
                header: 'Action',
                accessorKey: 'age',
                cell: ({row}) => {
                    return(
                        <MdDeleteOutline className=' text-xl'/>
                    )
                }
            },
        ],
        []
    )

    const [filesData,setFilesData] = useState([])
    const userId=localStorage.getItem('userId')
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetCrmFileManagerArchive(userId)
            setFilesData(response.data)
            console.log(response);
            
        }
        fetchData()
    }
    , [])

    const table = useReactTable({
        data:filesData,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

    return (
        <div>
            <h3 className='mb-5'>Archive</h3>
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
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={filesData.length}
                    onChange={onPaginationChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select<Option>
                        size="sm"
                        isSearchable={false}
                        value={pageSizeOption.filter(
                            (option) =>
                                option.value ===
                                table.getState().pagination.pageSize
                        )}
                        options={pageSizeOption}
                        onChange={(option) => onSelectChange(option?.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default PaginationTable

