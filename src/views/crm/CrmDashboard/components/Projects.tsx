import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import {
    createColumnHelper,
} from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import type { Customer } from '../store'
import { useEffect, useState } from 'react'
import { HiOutlineEye } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { BiSolidBellRing } from 'react-icons/bi'


type LeadsProps = {
    data?: Customer[]
    className?: string
    
}

const { Tr, Td, TBody, THead, Th } = Table





const NameColumn = ({ row }: { row: Customer }) => {
    
    
    return (
        <div className="flex items-center gap-2">
            <span className="font-semibold">{row.clientName}</span>
        </div>
    )
}

const LeadStatus = ({ status }: { status: number }) => {
    switch (status) {
        case 0:
            return <Tag className="rounded-md">Not Interested</Tag>
        case 1:
            return (
                <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100  border-0 rounded">
                    Interested
                </Tag>
            )
        case 2:
            return (
                <Tag className="text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20  border-0 rounded">
                    Follow Up
                </Tag>
            )
        case 3:
            return (
                <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded">
                    No Response
                </Tag>
            )
        default:
            return <></>
    }
}

const columnHelper = createColumnHelper<Customer>()


const Project = ({ data = [], className }: LeadsProps) => {
    const [datas, setData] = useState([]);
    const { textTheme } = useThemeClass()
  
    const navigate = useNavigate()

 

    const onNavigate = () => {
        navigate('/app/crm/projectslist')
    }
    interface client{
        client_name:string
    }
    interface Data {
       project_name:string
       project_type:string
       project_status:string
       project_id:string
       client:client[]
       timeline_date:string
      }
      interface ApiResponse {
        projects: Data[];
      }
      interface ApiResponse1 {
        data: ApiResponse[];
      }

    const [apiData, setApiData] = useState<Data[]>([]);

    useEffect(() => {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      fetch('https://col-u3yp.onrender.com/v1/api/admin/getall/project/?id=65c32e19e0f36d8e1f30955c')
        .then((response) => response.json())
        .then((data: ApiResponse1) => setApiData(data.data.projects.slice(0,5)))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
   
    

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-4">
                <h4>Projects</h4>
                <Button size="sm" onClick={onNavigate}>
                    View All Projects
                </Button>
            </div>
            <Table>
        <THead>
          <Tr>
            <Th>Project Name</Th>
            <Th>Project Status</Th>
            <Th>Client Name</Th>
            <Th>Project End Date</Th>
            <Th>Project Type</Th>
            <Th></Th>
          </Tr>
        </THead>
        <TBody>
          {apiData.map((item, index) => {
              const currentDate = new Date();
              const projectEndDate = new Date(item.timeline_date);
              const dateDifference = Math.floor((projectEndDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
            return(
            <Tr key={index}>
            <Td className={`capitalize ${dateDifference <= 1 ? 'text-red-500' : ''} flex gap-2 items-center cursor-pointer`} onClick={()=>navigate(`/app/crm/project-details?project_id=${item.project_id}&client_name=${item.client[0].client_name}&id=65c32e19e0f36d8e1f30955c&type=tab1`)}>
              {item.project_name} {dateDifference <= 1 && <BiSolidBellRing />}
            </Td>
              <Td className=' capitalize'>{item.project_status}</Td>
              <Td className="capitalize">{item.client[0].client_name}</Td>
              <Td>{dayjs(item.timeline_date).format('DD-MM-YYYY')}</Td>
              <Td  >
                <span className={
                  item.project_type === 'commercial' || item.project_type==='Commercial'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded px-2 py-1 capitalize font-semibold text-xs'
                    : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100  border-0 rounded capitalize font-semibold text-xs px-2 py-1'
                }>{item.project_type}</span>
              </Td>
              <Td className={`cursor-pointer p-2 hover:${textTheme} text-lg`}><HiOutlineEye onClick={()=>navigate(`/app/crm/project-details?project_id=${item.project_id}&id=65c32e19e0f36d8e1f30955c&type=tab1`)}/></Td>
            </Tr>
          )})}
        </TBody>
      </Table>
        </Card>
    )
}

export default Project
