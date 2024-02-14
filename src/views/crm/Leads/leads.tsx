import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from './components/LeadsTable'
import CustomersTableTools from './components/LeadsTableTools'
import CustomerStatistic from './components/LeadsStatistic'
import { injectReducer } from '@/store'
import reducer from './store'

injectReducer('crmCustomers', reducer)

const Customers = () => {
    return (
        <>
            <CustomerStatistic />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Customers
