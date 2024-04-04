import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import OrderDeleteConfirmation from './components/OrderDeleteConfirmation'
import Filtering from './components/DataTable'

injectReducer('salesOrderList', reducer)

const OrderList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <Filtering />
            <OrderDeleteConfirmation />
        </AdaptableCard>
    )
}

export default OrderList
