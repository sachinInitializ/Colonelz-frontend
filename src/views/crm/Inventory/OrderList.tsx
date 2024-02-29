import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import OrderDeleteConfirmation from './components/OrderDeleteConfirmation'
import Filtering from './components/DataTable'

injectReducer('salesOrderList', reducer)

const OrderList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Minutes Of Meeting</h3>
            
            </div>
            <Filtering />
            <OrderDeleteConfirmation />
        </AdaptableCard>
    )
}

export default OrderList
