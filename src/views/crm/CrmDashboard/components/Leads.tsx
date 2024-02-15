import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import type { Lead } from '../store'
import { useEffect, useState } from 'react'
import { HiOutlineEye } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'


type LeadsProps = {
    data?: Lead[]
    className?: string
}

const { Tr, Td, TBody, THead, Th } = Table

const NameColumn = ({ row }: { row: Lead }) => {
    
    
    return (
        <div className="flex items-center gap-2">
            <span className="font-semibold">{row.projectName}</span>
        </div>
    )
}

const LeadStatus = ({ projectType }: { projectType: number }) => {
    switch (projectType) {
        case 0:
            return <Tag className="rounded-md">New</Tag>
        case 1:
            return (
                <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100  border-0 rounded">
                    Commercial
                </Tag>
            )
        case 2:
            return (
                <Tag className="text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20  border-0 rounded">
                    Not Interested
                </Tag>
            )
        case 3:
            return (
                <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded">
                    Residential
                </Tag>
            )
        default:
            return <></>
    }
}

const columnHelper = createColumnHelper<Lead>()

const columns = [
    columnHelper.accessor('name', {
        header: 'Prjocet Name',
        cell: (props) => {
            const row = props.row.original
            return <NameColumn row={row} />
        },
    }),
    columnHelper.accessor('projectType', {
        header: 'Project Type',
        cell: (props) => {
            const row = props.row.original
            return <LeadStatus projectType={row.projectType} />
        },
    }),
    columnHelper.accessor('phase', {
        header: 'Phase',
    }),
    columnHelper.accessor('clientName', {
        header: 'Client Name',
        
    }),
    columnHelper.accessor('estimatedCompletion', {
        header: 'Timeline',
      
    }),
]

const Leads = ({ data = [], className }: LeadsProps) => {
    const navigate = useNavigate()
    const { textTheme } = useThemeClass()
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const onNavigate = () => {
        navigate('/app/leadsus')
    }

    interface client{
        client_name:string
    }
    interface Data {
       name:string
       status:string
       location:string
       date:string
       phone:string
       lead_id:string
      }
      interface ApiResponse {
        data: Data[];
      }
     

    const [apiData, setApiData] = useState<Data[]>([]);

    useEffect(() => {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      fetch('https://col-u3yp.onrender.com/v1/api/admin/getall/lead/')
        .then((response) => response.json())
        .then((data: ApiResponse) => setApiData(data.data.slice(0,5)))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
 

   

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-4">
                <h4>Leads</h4>
                <Button size="sm" onClick={onNavigate}>
                    View All Leads
                </Button>
            </div>
            <Table>
        <THead>
          <Tr>
            <Th>Lead Name</Th>
            <Th>Lead Status</Th>
            <Th>Location</Th>
            <Th>Lead Date</Th>
            <Th>Phone</Th>
            <Th></Th>
          </Tr>
        </THead>
        <TBody>
          {apiData.map((item, index) => (
            <Tr key={index}>
              <Td className=' capitalize'>{item.name}</Td>
              <Td className=' capitalize'>{item.status}</Td>
              <Td className="capitalize">{item.location}</Td>
              <Td>{dayjs(item.date).format('DD-MM-YYYY')}</Td>
              <Td  >
               {item.phone}
              </Td>
              <Td className={`cursor-pointer p-2 hover:${textTheme}`}><HiOutlineEye onClick={()=>navigate(`/app/crm/lead/?id=${item.lead_id}`)} /></Td>
            </Tr>
          ))}
        </TBody>
      </Table>
        </Card>
    )
}

export default Leads
