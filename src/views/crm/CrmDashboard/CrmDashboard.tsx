import Project from "./components/Projects";
import Statistic from "./components/Statistic";
import Leads from "./components/Leads";
import { ProjectProvider, useProjectContext } from "../Customers/store/ProjectContext";

interface Data{
    Execution_Phase:string,
    Design_Phase:string,
    completed:string

}
const CrmDashboard = () => {
    const {apiData}=useProjectContext()

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
                <Project />
                {(role === 'ADMIN' || role === 'Senior Architect' || role==='Project Architect') && <Leads />}
                
          
        </div>
    )
}

export default CrmDashboard
