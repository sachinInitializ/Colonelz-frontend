import React, { useEffect, useState } from 'react'
import { getTemplateData } from '../data'
import { TemplateDataItem } from '../type'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, Dialog, Notification, Skeleton, toast } from '@/components/ui'
import type { MouseEvent } from 'react'
import YourFormComponent from './TemplateForm'
import Footer from '@/views/crm/FileManager/Footer'
import { HiTrash } from 'react-icons/hi'
import { apiDeleteFileManagerFolders } from '@/services/CrmService'
import { ConfirmDialog, StickyFooter } from '@/components/shared'

import { useMemo } from 'react'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import type {
    ColumnDef,
    FilterFn,
    ColumnFiltersState,
} from '@tanstack/react-table'
import type { InputHTMLAttributes } from 'react'
import { AiOutlineDelete, AiOutlineFolder } from 'react-icons/ai'
import NoData from '@/views/pages/NoData'

interface DebouncedInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'size' | 'prefix'
    > {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])
    return (
        <div className="flex justify-end">
            <div className="flex items-center mb-4">
                <span className="mr-2"></span>
                <Input
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank,
    })
    return itemRank.passed
}

const Index = () => {
    const [templateData, setTemplateData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const folderName = queryParams.get('folder')
    const type = queryParams.get('type')
    useEffect(() => {
        const fetchDataAndLog = async () => {
            try {
                const templateData = (await getTemplateData()) || []
                setLoading(false)
                setTemplateData(
                    templateData
                        .filter(
                            (item) =>
                                item.files[0].folder_name === type &&
                                item.files[0].sub_folder_name_first ===
                                    folderName,
                        )
                        .map((item) => item.files[0]),
                )
            } catch (error) {
                console.error('Error fetching lead data', error)
            }
        }

        fetchDataAndLog()
    }, [])
    //   const data=templateData.filter((item)=>item.files[0].folder_name===type && item.files[0].sub_folder_name_first===folderName).map((item)=>item.files[0])
    const navigate = useNavigate()

    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const [dialogIsOpen2, setIsOpen2] = useState(false)
    const [folder_Name, setFolderName] = useState<string>('')

    const openDialog2 = (folder_name: string) => {
        setFolderName(folder_name)
        setIsOpen2(true)
    }

    const onDialogClose2 = () => {
        setIsOpen2(false)
    }
    const deleteFolders = async (folder_name: string) => {
        function warn(text: string) {
            toast.push(
                <Notification closable type="warning" duration={2000}>
                    {text}
                </Notification>,
                { placement: 'top-center' },
            )
        }
        if (folder_name.length === 0) {
            warn('No files selected for deletion.')
            return
        }
        const postData = {
            lead_id: '',
            folder_name: type,
            type: 'template',
            project_id: '',
            sub_folder_name_first: folderName,
            sub_folder_name_second: folder_name,
        }
        console.log(postData)

        try {
            await apiDeleteFileManagerFolders(postData)
            toast.push(
                <Notification closable type="success" duration={2000}>
                    Folder deleted successfully
                </Notification>,
                { placement: 'top-center' },
            )
            window.location.reload()
        } catch (error) {
            toast.push(
                <Notification closable type="danger" duration={2000}>
                    Error deleting folder
                </Notification>,
                { placement: 'top-center' },
            )
        }
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                header: 'Name',
                accessorKey: 'folder_name',
                cell: ({ row }) => (
                    <div className="flex items-center">
                        <AiOutlineFolder className="mr-2 text-xl" />
                        <Link
                            to={`/app/crm/fileManager/project/templates/residential/subfolder/files?type=${type}&folder=${folderName}&subfolder=${row.original.sub_folder_name_second}&folder_id=${row.original.folder_id}`}
                        >
                            {row.original.sub_folder_name_second}
                        </Link>
                    </div>
                ),
            },
            {
                header: 'type',
                accessorKey: 'type',
                cell: ({ row }) => {
                    return <div>Folder</div>
                },
            },
            { header: 'items', accessorKey: 'total_files' },
            {
                header: 'modified',
                accessorKey: 'updated_date',
                cell: ({ row }) => {
                    return formatDate(row.original.updated_date)
                },
            },
            {
                header: 'Actions',
                accessorKey: 'action',
                id: 'actions',
                cell: ({ row }) => {
                    return (
                        <div
                            className=" flex justify-center"
                            onClick={() =>
                                openDialog2(row.original.sub_folder_name_second)
                            }
                        >
                            <AiOutlineDelete className=" text-xl text-center hover:text-red-500" />
                        </div>
                    )
                },
            },
        ],
        [],
    )

    const table = useReactTable({
        data: templateData,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugHeaders: true,
        debugColumns: false,
    })

    return (
        <div>
            <div className=" mb-5 flex justify-between">
                <h3 className="">Folder</h3>
                <Button variant="solid" size="sm" onClick={() => openDialog()}>
                    Upload
                </Button>
            </div>
            {!loading ? templateData.length === 0 ?(<NoData />): (
                <div className="h-screen w-full">
                    <div className="flex-1 p-4">
                        <div className="flex items-center mb-4">
                            <nav className="flex">
                                <ol className="flex items-center space-x-2">
                                    <li>
                                        <a
                                            href="/app/crm/fileManager"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            FileManager
                                        </a>
                                    </li>
                                    <li>
                                        <span className="mx-2">/</span>
                                    </li>
                                    <li>
                                        <a
                                            href="/app/crm/fileManager"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Company Data
                                        </a>
                                    </li>
                                    {type==='company data'?<></>:<>
                                    <li>
                                        <span className="mx-2">/</span>
                                    </li>
                                    <li>
                                        <a
                                            href={`/app/crm/fileManager/project/templates/${type}`}
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            {type}
                                        </a>
                                    </li></>}
                                    <li>
                                        <span className="mx-2">/</span>
                                    </li>

                                    <li className="text-gray-500">
                                        {folderName}
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        <>
                            <Table>
                                <THead>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <Tr key={headerGroup.id}>
                                                {headerGroup.headers.map(
                                                    (header) => {
                                                        return (
                                                            <Th
                                                                key={header.id}
                                                                colSpan={
                                                                    header.colSpan
                                                                }
                                                            >
                                                              {header.isPlaceholder || header.id==='actions' ? null : (
                                                                    <div
                                                                        {...{
                                                                            className:
                                                                                header.column.getCanSort()
                                                                                    ? 'cursor-pointer select-none'
                                                                                    : '',
                                                                            onClick:
                                                                                header.column.getToggleSortingHandler(),
                                                                        }}
                                                                    >
                                                                        {flexRender(
                                                                            header
                                                                                .column
                                                                                .columnDef
                                                                                .header,
                                                                            header.getContext(),
                                                                        )}
                                                                        {
                                                                            <Sorter
                                                                                sort={header.column.getIsSorted()}
                                                                            />
                                                                        }
                                                                    </div>
                                                                )}
                                                            </Th>
                                                        )
                                                    },
                                                )}
                                            </Tr>
                                        ))}
                                </THead>
                                <TBody>
                                    {table.getRowModel().rows.map((row) => {
                                        return (
                                            <Tr key={row.id}>
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => {
                                                        return (
                                                            <Td key={cell.id}>
                                                                {flexRender(
                                                                    cell.column
                                                                        .columnDef
                                                                        .cell,
                                                                    cell.getContext(),
                                                                )}
                                                            </Td>
                                                        )
                                                    })}
                                            </Tr>
                                        )
                                    })}
                                </TBody>
                            </Table>
                        </>
                    </div>
                </div>
            ) : (
              <Skeleton height={300}/>
            )}
            <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4 mt-7"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
                <div className="md:flex items-center">
                    <Button
                        size="sm"
                        className="ltr:mr-3 rtl:ml-3"
                        type="button"
                        onClick={() => {
                            navigate(
                                type === 'company data'
                                    ? '/app/crm/fileManager'
                                    : `/app/crm/fileManager/project/templates/${type}`,
                            )
                        }}
                    >
                        Back
                    </Button>
                </div>
            </StickyFooter>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <YourFormComponent />
            </Dialog>
            <ConfirmDialog
                isOpen={dialogIsOpen2}
                type="danger"
                onClose={onDialogClose2}
                confirmButtonColor="red-600"
                onCancel={onDialogClose2}
                onConfirm={() => deleteFolders(folder_Name)}
                title="Delete Folder"
                onRequestClose={onDialogClose2}
            >
                <p> Are you sure you want to delete this folder? </p>
            </ConfirmDialog>
        </div>
    )
}

export default Index
