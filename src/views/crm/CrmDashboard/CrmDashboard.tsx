import { apiGetCrmProjects } from "@/services/CrmService"
import Project from "./components/Projects";
import { useEffect, useState } from "react";
import { Data } from "../CustomerDetail/components/MOM/data";
import Statistic from "./components/Statistic";
import Leads from "./components/Leads";
import { ProjectProvider } from "../Customers/store/ProjectContext";

interface Data{
    Execution_Phase:string,
    Design_Phase:string,
    completed:string

}
const CrmDashboard = () => {
    const [apiData, setApiData] = useState<Data>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetCrmProjects();
            const data = response.data;
            setApiData(data);
        };
        fetchData();
    }, []);
    console.log(apiData);

    const data=[
        {
            key: 'inProgress',
            label: 'Execution',
            value:apiData?.Execution_Phase,
            growShrink: 5.5,
        },
        {
            key: 'inReview',
            label: 'Design',
            value: apiData?.Design_Phase,
            growShrink: -0.7,
        },
        {
            key: 'completed',
            label: 'Completed',
            value: apiData?.completed,
            growShrink: 2.6,
        },
    ]
    const role=localStorage.getItem('role');
    return (
        <div className="flex flex-col gap-4 h-full">
                    <Statistic data={data} />
                <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
                </div>
                <ProjectProvider>
                <Project />
                </ProjectProvider>
                {(role === 'ADMIN' || role === 'Senior Architect') && <Leads />}
                
          
        </div>
    )
}

export default CrmDashboard
