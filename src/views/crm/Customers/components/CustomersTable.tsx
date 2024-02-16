import { useEffect, useCallback, useMemo } from 'react'
import classNames from 'classnames';

import DataTable from '@/components/shared/DataTable'
import {
    getCustomers,
    setTableData,
    useAppDispatch,
    useAppSelector,
    Customer,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import {  useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import { HiOutlineEye } from 'react-icons/hi'
    const ActionColumn = ({ row }: { row: Customer }) => {
        const dispatch = useAppDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()
    
        const onEdit = () => {
    navigate(`/app/crm/customer-details?project_id=${row.project_id}&id=65c32e19e0f36d8e1f30955c&type=tab1`)
        }
        return (
            <div className="flex justify-end text-lg">
                <a href={`/app/crm/customer-details?project_id=${row.project_id}&id=65c32e19e0f36d8e1f30955c&type=tab1`}
                    
                >
                    <HiOutlineEye />
                </a>
               
            </div>
        )
}



const Customers = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.crmCustomers.data.customerList)
    const loading = useAppSelector((state) => state.crmCustomers.data.loading)
    const filterData = useAppSelector(
        (state) => state.crmCustomers.data.filterData
    )

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.crmCustomers.data.tableData
    )

    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageIndex, pageSize, sort, query, filterData }))
    }, [pageIndex, pageSize, sort, query, filterData, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort, filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<Customer>[] = useMemo(
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
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <CustomerEditDialog />
        </>
    )
}

export default Customers
