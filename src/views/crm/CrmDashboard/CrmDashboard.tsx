import { apiGetCrmProjects } from "@/services/CrmService"
import Project from "./components/Projects";
import { useEffect, useState } from "react";
import { Data } from "../CustomerDetail/components/MOM/data";
import { crmDashboardData } from "@/mock/data/crmData";
import Statistic from "./components/Statistic";


const CrmDashboard = () => {
    const [apiData, setApiData] = useState<Data[]>([]);

console.log('apiData',crmDashboardData.statisticData);
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetCrmProjects();
            const data = response.data;
            console.log('Received response from server:', data);
            setApiData(data);
        };
        fetchData();
    }, []);
    return (
        <div className="flex flex-col gap-4 h-full">
                    <Statistic data={crmDashboardData.statisticData} />
                <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
                    {/* <LeadByCountries
                        className="xl:col-span-5"
                        data={leadByRegionData}
                    /> */}
                </div>
                <Project />
                {/* <Leads data={datas} /> */}
          
        </div>
    )
}

export default CrmDashboard
