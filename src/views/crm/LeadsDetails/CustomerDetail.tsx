import { useEffect, useState } from 'react'
import Container from '@/components/shared/Container'
import reducer, { getCustomer, useAppDispatch } from './store'
import { injectReducer } from '@/store'
import useQuery from '@/utils/hooks/useQuery'
import MOM from './components/LeadForm'
import { Card } from '@/components/ui'
import CustomerProfile from './components/LeadProfile'

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
                const response = await fetch(`https://col-u3yp.onrender.com/v1/api/admin/getsingle/lead/?lead_id=${myParam}`);
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [myParam]);
    const lead = details?.data?.[0];
      return (
          <Container className="h-full">
                       <CustomerProfile data={lead}/>
                  <Card className='mt-5' >
                       <MOM data={lead}/>
                       </Card>
          </Container>
      );
 
};


export default CustomerDetail
