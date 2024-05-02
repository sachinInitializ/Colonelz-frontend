import { useMemo, useState, useEffect } from 'react'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import Pagination from '@/components/ui/Pagination'
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
import { useAppSelector, type Project } from '../store'
import type { ColumnDef, FilterFn, ColumnFiltersState } from '@tanstack/react-table'
import type { InputHTMLAttributes } from 'react'
import { HiOutlineEye, HiOutlineUserAdd, HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import useThemeClass from '@/utils/hooks/useThemeClass'
import classNames from 'classnames'
import {  Dropdown, Select } from '@/components/ui'
import { StatisticCard } from './CustomerStatistic'
import { BiSolidBellRing } from 'react-icons/bi'
import { apiGetCrmProjects } from '@/services/CrmService'

interface DebouncedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'prefix'> {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const userDetailData = await apiGetCrmProjects();
const projectData=userDetailData.data
const projects=userDetailData.data.projects
console.log('userDetailData', projectData);

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
        }, [value, debounce, onChange])

    return (
        <div className="flex justify-between ">
            <div className="flex items-center mb-4">
                <Input
                    {...props}
                    value={value}
                    size='sm'
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

const fuzzyFilter: FilterFn<Project> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank,
    })

    return itemRank.passed
}
type Option = {
    value: number
    label: string
}

const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
]
const totalData=projects.length

const Filtering = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [selectedStatus] = useState<string>('');
    const [globalFilter, setGlobalFilter] = useState('')
    const userId=localStorage.getItem('userId')
    const navigate=useNavigate()
    const ActionColumn = ({ row }: { row: Project }) => {
        const navigate = useNavigate()
        const { textTheme } = useThemeClass()
        const onEdit = () => {
            navigate(`/app/crm/project-details?project_id=${row.project_id}&client_name=${row.client[0].client_name}&project_type=${row.project_type}&id=&type=tab1`)
        }
        return (
            <div className="flex justify-end text-lg">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onEdit}
                >
                    <HiOutlineEye />
                </span>
            </div>
        )
    }

    const columns = useMemo<ColumnDef<Project>[]>(() => [
        {
            header: 'Project Name',
            accessorKey: 'project_name',
            cell: (prop) => {
                const row = prop.row.original;
                const projectName = row.project_name;
                const dateObject = new Date(row.timeline_date);
                const currentDate = new Date();
                const dateDifference = Math.floor(
                    (dateObject.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
                );
                const cellClassName = classNames({
                    'text-red-500': dateDifference <= 1 && row.project_status !== 'completed',
                });
                return (
                    <span className={`${cellClassName} flex gap-2 items-center cursor-pointer` } onClick={()=>navigate(`/app/crm/project-details?project_id=${row.project_id}&id=${userId}&type=tab1`)}>
                        {projectName} {dateDifference <= 1 && row.project_status!=='completed' && <BiSolidBellRing/>}
                    </span>
                );
            },
        },
        {
            header: 'Project Type',
            accessorKey: 'project_type',
            cell: (props) => {
                const row = props.row.original;
                const projectType = row.project_type;
                const cellClassName = classNames({
                    'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded px-2 py-1 capitalize font-semibold text-xs': projectType === 'commercial',
                    '': projectType === 'commercial' || projectType==='Commercial',
                    'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded capitalize font-semibold text-xs px-2 py-1': projectType === 'residential',
                    'bg-light-green-600': projectType === 'residential' || projectType==='Residential',
                });
                return (
                    <span className={cellClassName}>{row.project_type}</span>
                );
            }
        },
        {
            header: 'Client Name',
            accessorKey: 'client_name',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <div className=' cursor-pointer text-nowrap'>
                        <Dropdown placement="top-center" renderTitle={<span>{row.client[0].client_name}</span>} className=' cursor-pointer' style={{width:'auto'}}>
                            <div className='px-2'>
                                <p>Client Name: {row.client[0].client_name}</p>
                                <p>Client Email: {row.client[0].client_email}</p>
                                <p>Client Contact: {row.client[0].client_contact}</p>
                            </div>
                        </Dropdown>
                    </div>
                );
            },
        },
        {
            header: 'Project Status',
            accessorKey: 'project_status',
        },
        {
            header: 'Project Incharge',
            accessorKey: 'designer',
        },
        {
            header: 'Project End Date',
            accessorKey: 'timeline_date',
            cell: (props) => {
                const row = props.row.original;
                const dateObject = new Date(row.timeline_date);
                const istFormattedDate = dateObject.toLocaleDateString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }).replace(/\//g, '-');
                return istFormattedDate
            },
        },
       
    ], [navigate])

    const [data,setData] = useState(() => projects)

    const table = useReactTable({
        data,
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
    

    useEffect(() => {
        const filteredData =
            selectedStatus !== ''
                ? projects.projects.filter((project:Project) => project.project_status === selectedStatus)
                : projects.projects;

        setData(filteredData);
    }, [selectedStatus]);

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

    const loading = useAppSelector(
        (state) => state.crmCustomers.data.statisticLoading
    )

    const handleStatusChange = (label: string) => {
        let status: string | string[] = '';
    
        switch (label) {
            case 'Total Projects':
                status = [ 'executing','designing','completed'];
                break;
            case 'Active Projects':
                status = [ 'executing','designing'];
                break;
            case 'Completed Projects':
                status = 'completed';
                break;
            default:
                status = '';
                break;
        }

        if (Array.isArray(status)) {
            const filteredData = userDetailData.data.projects.filter((project:Project) =>
                status.includes(project.project_status)
            );
            setData(filteredData);
        } else {
            const filteredData = projectData.projects.filter(
                (project:Project) => project.project_status === status
            );
            setData(filteredData);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                <StatisticCard
                    icon={<HiOutlineUserGroup />}
                    avatarClass="!bg-indigo-600"
                    label="Total Projects"
                    value={projectData.total_Project}
                    loading={loading}
                    onClick={() => handleStatusChange('Total Projects')}
                />
                <StatisticCard
                    icon={<HiOutlineUsers />}
                    avatarClass="!bg-blue-500"
                    label="Active Projects"
                    value={projectData.active_Project}
                    loading={loading}
                    onClick={() => handleStatusChange('Active Projects')}
                />
                <StatisticCard
                    icon={<HiOutlineUserAdd />}
                    avatarClass="!bg-emerald-500"
                    label="Completed Projects"
                    value={projectData.completed}
                    loading={loading}
                    onClick={() => handleStatusChange('Completed Projects')}
                />
            </div>
            <div className='flex justify-end'>
            <DebouncedInput
                value={globalFilter ?? ''}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search ..."
                onChange={(value) => setGlobalFilter(String(value))}
            />
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
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : 'pointer-events-none',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {header.column.getCanSort() && (
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                )}
                                            </div>
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
                            <Tr key={row.id} className=' capitalize'>
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
                    total={totalData}
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
        </>
    )
}

export default Filtering
