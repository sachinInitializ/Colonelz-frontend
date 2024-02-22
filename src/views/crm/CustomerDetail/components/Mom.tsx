
import { useMemo, Fragment, useState, useEffect } from 'react'
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { momApiResponse,projectId } from './data'
import { HiOutlineChevronRight, HiOutlineChevronDown } from 'react-icons/hi'
import type { ApiResponse } from './data'
import type { ColumnDef, Row,ColumnSort } from '@tanstack/react-table'
import type { ReactElement, SyntheticEvent } from 'react'
import { log } from 'console'
import { Button, Dropdown } from '@/components/ui'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type ReactTableProps<T> = {
    renderRowSubComponent: (props: { row: Row<T> }) => ReactElement
    getRowCanExpand: (row: Row<T>) => boolean
    data:Data[]
}
type Data={
     mom:MOM[]
}
type MOM={
    mom_id:string
}

const { Tr, Th, Td, THead, TBody,Sorter} = Table

function ReactTable({ renderRowSubComponent, getRowCanExpand,data }: ReactTableProps<ApiResponse>) {

  
    const columns = useMemo<ColumnDef<ApiResponse>[]>(
        () => [
            {
                // Make an expander cell
                header: () => null, // No header
                id: 'expander', // It needs an ID
                cell: ({ row }) => (
                    <>
                        {row.getCanExpand() ? (
                            <button
                                className="text-lg"
                                {...{ onClick: row.getToggleExpandedHandler() }}
                            >
                                {row.getIsExpanded() ? (
                                    <HiOutlineChevronDown />
                                ) : (
                                    <HiOutlineChevronRight />
                                )}
                            </button>
                        ) : null}
                    </>
                ),
                // We can override the cell renderer with a SubCell to be used with an expanded row
                subCell: () => null, // No expander on an expanded row
            },
            {
                header: 'MOM Id',
                accessorKey: 'mom_id',
            },
         // Update the 'Client Name' column definition
{
  header: 'Client Name',
  accessorKey: 'attendees',
  cell: (props) => {
    const row = props.row.original;
    const clientNames = Array.isArray(row.attendees?.client_name)
      ? row.attendees.client_name
      : [row.attendees.client_name];

    return <span>{clientNames.join(', ')}</span>;
  },
},

            {
                header: 'Meeting Date',
                accessorKey: 'meetingdate',
                cell:(props)=>{
                    const row = props.row.original;
                    const originalDate = new Date(row.meetingdate);
              
                    // Formatting the date in dd-mm-yyyy format
                    const formattedDate = `${originalDate.getDate().toString().padStart(2, '0')}-${
                      (originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getFullYear()}`;
              
                    return <div>{formattedDate}</div>;
                }
            },
            {
                header: 'Source',
                accessorKey: 'source',
            },
          
        ],
        []
    )

    const location = useLocation();
  
    const [leadData,setLeadData]=useState<ApiResponse | null>(null)
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const projectId = searchParams.get('project_id');
      if (projectId) {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://col-u3yp.onrender.com/v1/api/admin/getall/mom/?project_id=${projectId}`);
            const data = await response.json();
            setLeadData(data.data)
            console.log(leadData);
            
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
  
        fetchData();
      }
    }, [location.search]);
    
 
    const [sorting, setSorting] = useState<ColumnSort[]>([])
    const table = useReactTable({
        data: leadData || [],
        columns,
        state: {
          sorting,
      },
      onSortingChange: setSorting,
        getRowCanExpand,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    })
 
const navigate=useNavigate()


    return (
        <>
        <div className='flex justify-end mb-4'>
        <Button className='flex justify-center items-center' size='sm' variant='solid' onClick={()=>navigate(`/app/crm/project/momform?project_id=${projectId}`)}>Add MOM </Button>
        </div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                      {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {
                                                   
                                                }
                                        </div>)}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.slice(0, 10).map((row) => {
                        return (
                            <Fragment key={row.id}>
                                <Tr>
                                    {/* first row is a normal row */}
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}
                                </Tr>
                                {row.getIsExpanded() && (
                                    <Tr>
                                        {/* 2nd row is a custom 1 cell row */}
                                        <Td
                                            colSpan={
                                                row.getVisibleCells().length
                                            }
                                        >
                                            {renderRowSubComponent({ row })}
                                        </Td>
                                    </Tr>
                                )}
                            </Fragment>
                        )
                    })}
                </TBody>
            </Table>
        </>
    )
}

const renderSubComponent = ({ row }: { row: Row<ApiResponse> }) => {
  const rowData = row.original;
  const Toggle = <Button>Files</Button>
  const clientNames = Array.isArray(rowData?.attendees?.client_name)
    ? rowData.attendees.client_name
    : [rowData.attendees.client_name];
    const files = Array.isArray(rowData.files) ? rowData.files : [];
  

   
    return (
       <div>
        <div className='flex justify-between items-center'>
        <h6>Date: {new Date(rowData.meetingdate).toISOString().split('T')[0]}</h6>
        <div className='grid grid-cols-2 gap-2'>
            <Button variant='solid' size='sm'>View MOM</Button>
            <Button variant='solid' size='sm'>Share MOM</Button>
        </div>
        </div>
        <h6 className=' capitalize'>Mode Of Meeting: {rowData.source}</h6>
        <div className='mt-4'>
           <h5 className=' mt-3'>Meeting attendees</h5>
           <p>Client Name: {rowData.attendees.client_name}</p>
           <p>Oraganisor: {rowData.attendees.organisor}</p>
           <p>Architect: {rowData.attendees.architect}</p>
           <p>Consultant Name: {rowData.attendees.consultant_name}</p>
        </div>
        <div className='mt-4'>
           <h5 className=' mt-3'>Remarks</h5>
           <p>{rowData.remark}</p>
        </div>
        <div className='mt-4 mb-4'>
           <h5 className=' mt-3'>Important Note</h5>
           <p>{rowData.imaportant_note}</p>
        </div>
        <div className='grid grid-cols-10 '>
       
                {files.map((item) => (
                  <div className=''>
                   <a href={item} target='_blank'> <Button variant='solid' className=' capitalize'>file</Button></a>
                   </div>
                ))}
        </div>
       </div>
    )
}

const SubComponent = ({data}:ApiResponse) => {
    return (
        <ReactTable
            renderRowSubComponent={renderSubComponent}
            getRowCanExpand={() => true}
            data={data}

        />
    )
}

export default SubComponent

