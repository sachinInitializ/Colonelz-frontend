import { useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Loading from '@/components/shared/Loading'
import Container from '@/components/shared/Container'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import CustomerProfile from './components/CustomerProfile'
import PaymentHistory from './components/PaymentHistory'
import CurrentSubscription from './components/CurrentSubscription'
import PaymentMethods from './components/PaymentMethods'
import reducer, { getCustomer, useAppDispatch, useAppSelector } from './store'

import { injectReducer } from '@/store'
import isEmpty from 'lodash/isEmpty'
import useQuery from '@/utils/hooks/useQuery'
import MOM from './components/Mom'
import { Card, Tabs } from '@/components/ui'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import TabContent from '@/components/ui/Tabs/TabContent'
import PersonalInfoForm from '../CustomerForm/PersonalInfoForm'
import { log } from 'console'
import { useParams } from 'react-router-dom'
import { fetchDetails } from '../services/api'

injectReducer('crmCustomerDetails', reducer)

const CustomerDetail = () => {
    const dispatch = useAppDispatch()

    const query = useQuery()

    const data = useAppSelector(
        (state) => state.crmCustomerDetails
    )
    const loading = useAppSelector(
        (state) => state.crmCustomerDetails.data.loading
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const fetchData = () => {
        const id = query.get('lead_id')
        if (id) {
            dispatch(getCustomer({ id }))
        }
    }
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    
    const { id } = useParams<{ id: string }>();
    const [details, setDetails] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://col-u3yp.onrender.comv1/api/admin/getsingle/lead/?lead_id=${myParam}`);
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [myParam]);

    // Check if details is not null and if details.data is an array with at least one element
    const lead = details?.data?.[0];

    
    console.log();
    
    
    // Only proceed if lead is not null
    if (lead) {
        const name = lead.name;
        const email = lead.email;
        const id=lead.lead_id
        
        // You can use name and email as needed in your component
    }

      return (
          <Container className="h-full">
              
                       <CustomerProfile data={lead}/>
                   
                  <Card className='mt-5' >
                       <MOM data={lead}/>
                       </Card>
                   
            
              {/* Other components or logic related to the customer detail */}
          </Container>
      );
 
};


export default CustomerDetail
