import { useRef } from 'react'
import Button from '@/components/ui/Button'
import {
    getCustomers,
    setTableData,
    setFilterData,
    useAppDispatch,
    useAppSelector,
} from '../store'
import CustomerTableSearch from './CustomerTableSearch'
import CustomerTableFilter from './CustomerTableFilter'
import cloneDeep from 'lodash/cloneDeep'
import type { TableQueries } from '@/@types/common'
import { useNavigate } from 'react-router-dom'

const CustomersTableTools = () => {
    const dispatch = useAppDispatch()

    const inputRef = useRef<HTMLInputElement>(null)

    const tableData = useAppSelector(
        (state) => state.crmCustomers.data.tableData
    )

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data: TableQueries) => {
        dispatch(setTableData(data))
        dispatch(getCustomers(data))
    }
const navigate=useNavigate()
    const onClearAll = () => {
       navigate('/app/crm/projectform')
    }

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                {/* <CustomerTableFilter /> */}
            </div>
            <div className="mb-4">
                <Button size="sm" onClick={onClearAll} variant='solid'>
                    Create Project
                </Button>
            </div>
        </div>
    )
}

export default CustomersTableTools
