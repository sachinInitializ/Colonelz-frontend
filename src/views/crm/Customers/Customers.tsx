import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from './components/CustomersTable'
import { injectReducer } from '@/store'
import reducer from './store'

injectReducer('crmCustomers', reducer)

const Customers = () => {
    return (
        <>
           
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Customers
