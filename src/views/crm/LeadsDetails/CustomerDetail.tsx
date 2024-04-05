import { useEffect, useState } from 'react'
import Container from '@/components/shared/Container'
import reducer, { getCustomer, useAppDispatch } from './store'
import { injectReducer } from '@/store'
import useQuery from '@/utils/hooks/useQuery'
import LeadForm from './components/LeadForm'
import { Card, Tabs } from '@/components/ui'
import CustomerProfile from './components/LeadProfile'
import { apiGetCrmLeadsDetails } from '@/services/CrmService'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import TabContent from '@/components/ui/Tabs/TabContent'
import Contract from '../CustomerDetail/components/Contract'

injectReducer('crmCustomerDetails', reducer)

const CustomerDetail = () => {
    const dispatch = useAppDispatch()

    const query = useQuery()

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = () => {
        const id = query.get('lead_id')
        if (id) {
            dispatch(getCustomer({ id }))
        }
    }
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    const [details, setDetails] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetCrmLeadsDetails(myParam);
                setDetails(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [myParam]);
    const lead = details?.data?.[0];
      return (
        <>    
          <Tabs defaultValue="Details">
                <TabList>
                    <TabNav value="Details">
                        Lead Details
                    </TabNav>
                    <TabNav value="Actions" >
                        Actions
                    </TabNav>
                    <TabNav value="Contract" >
                        Contract
                    </TabNav>
                </TabList>
                <div className="p-4">
                    <TabContent value="Details">
                    <CustomerProfile data={lead}/>
                    </TabContent>
                    <TabContent value="Actions">
                    <Card className='mt-5' >
                       <LeadForm data={lead}/>
                       </Card>
                    </TabContent>
                    <TabContent value="Contract">
                        <Contract/>
                    </TabContent>
                    </div>
                </Tabs>
              <Container className="h-full">
                      
              
          </Container>
          </>

      );
 
};


export default CustomerDetail
