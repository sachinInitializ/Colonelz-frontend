import { useEffect, useMemo, useRef, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineEye } from 'react-icons/hi'
import {
    getProducts,
    setTableData,
    setSelectedProduct,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import ProductDeleteConfirmation from './ProductDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import { use } from 'i18next'
import { apiGetCrmLeads } from '@/services/CrmService'




const ActionColumn = ({ row }: { row: Product }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {

        navigate(`/app/crm/lead/?id=${row.lead_id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }

  
    

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlineEye />
            </span>
            {/* <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span> */}
        </div>
    )
}



const ProductTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesProductList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.salesProductList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.salesProductList.data.loading
    )

   const [data,setData] = useState([])
   useEffect(() => {
    const fetchData=async()=>{
        const response = await apiGetCrmLeads();
        const data = response.data;
        console.log('Received response from server:', data);
        setData(data);
    
   }
fetchData()},[])

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getProducts({ pageIndex, pageSize, sort, query, filterData }))
    }
 
    const columns: ColumnDef<Product>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
               
            },
            {
                header: 'Email',
                accessorKey: 'email',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.email}</span>
                },
            },
            {
                header: 'Lead Date',
                accessorKey: 'createdAt',
                cell: (props) => {
                    const row = props.row.original;
                    const date = new Date(row.createdAt);
                    const formattedDate = date.toISOString().split('T')[0];
                    return formattedDate;
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
                // cell: (props) => {
                //     const { status } = props.row.original
                //     return (
                //         <div className="flex items-center gap-2">
                //             <Badge
                //                 className={
                //                     inventoryStatusColor[status].dotClass
                //                 }
                //             />
                //             <span
                //                 className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}
                //             >
                //                 {inventoryStatusColor[status].label}
                //             </span>
                //         </div>
                //     )
                // },
            },
            {
                header: 'Phone',
                accessorKey: 'phone',
                sortable: true,
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
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <ProductDeleteConfirmation />
        </>
    )
}

export default ProductTable
