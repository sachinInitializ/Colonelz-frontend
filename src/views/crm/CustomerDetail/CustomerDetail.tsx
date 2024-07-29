import { useEffect, useState } from 'react'
import Container from '@/components/shared/Container'
import CustomerProfile from './components/CustomerProfile'
import reducer, { getCustomer, useAppDispatch } from './store'
import { injectReducer } from '@/store'
import useQuery from '@/utils/hooks/useQuery'
import MOM from './components/MOM/Mom'
import { Skeleton, Tabs } from '@/components/ui'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import TabContent from '@/components/ui/Tabs/TabContent'
import { useLocation, useNavigate } from 'react-router-dom'
import AllMom from './components/MOM/AllMom'
import {  apiGetCrmSingleProjectQuotation, apiGetCrmSingleProjects } from '@/services/CrmService'
import { FileItem } from '../FileManager/Components/Project/data'
import Index from './Quotation'
import { MomProvider } from './store/MomContext'
import { ProjectProvider } from '../Customers/store/ProjectContext'
import Task from './Task/index'
import Activity from './Project Progress/Activity'
import Timeline from './Timeline/Timeline'

injectReducer('crmCustomerDetails', reducer)

const CustomerDetail = () => {
    const dispatch = useAppDispatch()
    const query = useQuery()
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        const id = query.get('lead_id')
        if (id) {
            dispatch(getCustomer({ id }))
        }
    }
    interface QueryParams {
        id: string;
        project_id: string;
        mom:string
      
      }
      const [fileData,setFileData]=useState<FileItem[]>();
      const navigate = useNavigate();
    const location = useLocation();
    const role=localStorage.getItem('role');
    const queryParams = new URLSearchParams(location.search);
    const allQueryParams: QueryParams = {
      id: queryParams.get('id') || '',
      project_id: queryParams.get('project_id') || '',
      mom: queryParams.get('type') || '',
    };
    const [details, setDetails] = useState<any | null>(null);
    const[momdata,setmomdata]= useState<any >(null);

    const handleTabChange = (selectedTab:any) => {
      const currentUrlParams = new URLSearchParams(location.search);
      currentUrlParams.set('type', selectedTab);
      navigate(`${location.pathname}?${currentUrlParams.toString()}`);
  };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetCrmSingleProjects(allQueryParams.project_id);
                const data = response
                setDetails(data.data[0]);
                setLoading(false);
                setmomdata(data.data[0].mom)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDataAndLog = async () => {
          try {
            const leadData = await apiGetCrmSingleProjectQuotation(allQueryParams.project_id)
           setFileData(leadData.data)
          } catch (error) {
            console.error('Error fetching lead data', error);
          }
        };
    
        fetchDataAndLog();
      }, []);

      
      return (
        <>
        <h3 className='pb-5'>Project-{loading?<Skeleton width={100}/>:details?details.project_name:""}</h3>
        <div>
          <ProjectProvider>
          <MomProvider>
{loading?<Skeleton height={400}/>:
          <Tabs defaultValue={allQueryParams.mom} onChange={handleTabChange}>
            <TabList>
                <TabNav value="tab1">Details</TabNav>
                {(role === 'ADMIN' || role === 'Senior Architect' || role === 'Executive Assistant') && (
                  <TabNav value="tab2">Quotation</TabNav>
                )}{role !== 'Executive Assistant' && (
                  <>
                    <TabNav value="mom" >MOM</TabNav>
                    <TabNav value="tab4">Task Manager</TabNav>
                    <TabNav value="tab5">Project Activity</TabNav>
                    <TabNav value="tab6">Timeline</TabNav>
                  </>
                )}
            </TabList>
            <div className="p-4">
                <TabContent value="tab1">
                  {loading ? <Skeleton width={150}/> :
                    <Container>
                        <CustomerProfile data={details}/>
                    </Container>}
                </TabContent>
                <TabContent value="tab2">
                  <Index data={fileData }/>
                </TabContent>
                <TabContent value="mom">
                  <MOM data={details} />
                </TabContent>
              
                <TabContent value="tab4">
                  <Task/>
                </TabContent>
                <TabContent value="tab5">
                  <Activity Data={details} />
                </TabContent>
                <TabContent value="tab6">
                  <Timeline/>
                </TabContent>

            </div>
        </Tabs>}
        </MomProvider>
        </ProjectProvider>
    </div>
    </>);
 
};


export default CustomerDetail
