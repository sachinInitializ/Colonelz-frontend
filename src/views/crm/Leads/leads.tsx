import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomerStatistic from './components/LeadsStatistic'
import { injectReducer } from '@/store'

injectReducer('crmCustomers', reducer)

const Customers = () => {
    return (
        <>
            <CustomerStatistic />
            <AdaptableCard className="h-full" bodyClass="h-full">
                
            </AdaptableCard>
        </>
    )
}

export default Customers
