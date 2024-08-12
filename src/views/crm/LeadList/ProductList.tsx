import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ProductTable from './components/ProductTable'
import ProductTableTools from './components/ProductTableTools'
import { AuthorityCheck } from '@/components/shared'
import { fetchRoleAccessData } from '../Roles/roleData'
import { RoleAccessData } from '@/@types/navigation'

injectReducer('salesProductList', reducer)
async function getRoleAccessData(): Promise<RoleAccessData> {
    try {
        const roleAccessData = await fetchRoleAccessData();
        return roleAccessData;
    } catch (error) {
        console.error("Error fetching role access data:", error);
        throw error;
    }
}

const data: RoleAccessData = await getRoleAccessData();

const ProductList = () => {
    return (
      
        <AdaptableCard className="h-full" bodyClass="h-full">
         
            <ProductTable />
        </AdaptableCard>
    )
}

export default ProductList
