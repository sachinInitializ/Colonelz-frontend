import { useEffect, useState } from 'react'
import reducer, {
    getCrmDashboardData,
    useAppDispatch,
    useAppSelector,
} from './store'
import { injectReducer } from '@/store/'

import Loading from '@/components/shared/Loading'
import Statistic from './components/Statistic'
import Leads from './components/Leads'
import Project from './components/Projects'



injectReducer('crmDashboard', reducer)

const CrmDashboard = () => {
    const dispatch = useAppDispatch()
    const [datas, setDatas] = useState<any>(null);

    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://col-u3yp.onrender.comv1/api/admin/getall/project?id=65c32e19e0f36d8e1f30955c'); // Replace with your API endpoint
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          
         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }, []);



    const { statisticData, leadByRegionData, recentLeadsData, emailSentData,customerData } =
        useAppSelector((state) => state.crmDashboard.data.dashboardData)
    const loading = useAppSelector((state) => state.crmDashboard.data.loading)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getCrmDashboardData())
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the JSON file or use any other method to load data
       
    }, []);

    

    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={loading}>
                <Statistic data={statisticData} />
                <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
                    {/* <LeadByCountries
                        className="xl:col-span-5"
                        data={leadByRegionData}
                    /> */}
                {statisticData?.map((proj:any)=>(
                    <p>{proj.lebel}</p>
                ))}
                </div>
                    <Project data={customerData}/>
                <Leads data={recentLeadsData} />
            </Loading>
        </div>
    )
}

export default CrmDashboard
