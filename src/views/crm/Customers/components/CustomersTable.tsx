
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
import { userDetailData } from '@/mock/data/usersData'
import { useAppSelector, type Customer } from '../store'
import type { ColumnDef, FilterFn, ColumnFiltersState } from '@tanstack/react-table'
import type { InputHTMLAttributes } from 'react'
import { HiOutlineEye, HiOutlineUserAdd, HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import useThemeClass from '@/utils/hooks/useThemeClass'
import classNames from 'classnames'
import { Button, Select } from '@/components/ui'
import { StatisticCard } from './CustomerStatistic'

interface DebouncedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'prefix'> {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
   const navigate=useNavigate()
    return (
        <div className="flex justify-between ">

            <div className="flex items-center mb-4">
                <Input
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size='sm'
                />
            </div>
            <Button onClick={()=>navigate('/app/crm/projectform')} size='sm' variant='solid'>Create Project</Button>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
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
const totalData=userDetailData.projects.length

const Filtering = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [globalFilter, setGlobalFilter] = useState('')
    const ActionColumn = ({ row }: { row: Customer }) => {
        const navigate = useNavigate()
        const { textTheme } = useThemeClass()
        const onEdit = () => {
    
            navigate(`/app/crm/customer-details?project_id=${row.project_id}&id=65c32e19e0f36d8e1f30955c&type=tab1`)
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

    const columns = useMemo<ColumnDef<Customer>[]>(
        () => [
            {
                header: 'Project Name',
                accessorKey: 'project_name',
               
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
                    return <span>{row.client[0].client_name}</span>;
                },
               
            },
            {
                header: 'Status',
                accessorKey: 'project_status',
                
              
            },
            {
                header: 'Timeline',
                accessorKey: 'timeline_date',
                cell: (props) => {
                    const row = props.row.original;
                    const date = new Date(row.timeline_date);
                    const formattedDate = date.toISOString().split('T')[0];
                    return formattedDate;
                },
                
            },
            {
                
                
                id:"action",
                filterable: false,
                cell: (props) => <ActionColumn row={props.row.original} />,
                header: () => null,
            
            },
        ],
        []
    )

    const [data,setData] = useState(() => userDetailData.projects)

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
        // Update the table data based on the selected project status
        const filteredData =
            selectedStatus !== ''
                ? userDetailData.projects.filter((project) => project.project_status === selectedStatus)
                : userDetailData.projects;

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
        console.log('Clicked on Statistic Card with label:', label);
    
        let status: string | string[] = '';
    
        switch (label) {
            case 'Total Projects':
                // Filter for all projects
                status = [ 'executing','designing','completed'];
                break;
            case 'Active Projects':
                // Filter for active projects
                status = [ 'executing','designing']; // Adjust the status according to your data
                break;
            case 'Completed Projects':
                // Filter for completed projects
                status = 'completed'; // Adjust the status according to your data
                break;
            // Add more cases if needed for additional labels
            default:
                status = '';
                break;
            }
            console.log('Selected Status:', status);

            if (Array.isArray(status)) {
                // For array, filter projects whose status is in the array
                const filteredData = userDetailData.projects.filter((project) =>
                    status.includes(project.project_status)
                );
                setData(filteredData);
            } else {
                // For string, filter projects with the specific status
                const filteredData = userDetailData.projects.filter(
                    (project) => project.project_status === status
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
                    value={userDetailData.total_Project}
                    loading={loading}
                    onClick={() => handleStatusChange('Total Projects')}
                />
                <StatisticCard
                    icon={<HiOutlineUsers />}
                    avatarClass="!bg-blue-500"
                    label="Active Projects"
                    value={userDetailData.active_Project}
                    loading={loading}
                    onClick={() => handleStatusChange('Active Projects')}
                />

                <StatisticCard
                    icon={<HiOutlineUserAdd />}
                    avatarClass="!bg-emerald-500"
                    label="Completed Projects"
                    value={userDetailData.completed}
                    loading={loading}
                    onClick={() => handleStatusChange('Completed Projects')}
                />
        </div>
            <DebouncedInput
                value={globalFilter ?? ''}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search ..."
                onChange={(value) => setGlobalFilter(String(value))}
            />
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

