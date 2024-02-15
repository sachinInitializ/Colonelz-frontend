
import { useMemo, Fragment, useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom'

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
            },
            {
                header: 'Source',
                accessorKey: 'source',
            },
          
        ],
        []
    )
    const [sorting, setSorting] = useState<ColumnSort[]>([])
    const table = useReactTable({
        data: momApiResponse,
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
    const onDropdownClick = (e: SyntheticEvent) => {
      console.log('Dropdown Clicked', e)
  }
    // State to manage the selected file
   
    return (
       <div>
        <div className='flex justify-between items-center'>
        <h6>Date: {rowData.meetingdate}</h6>
        <h6>Mode Of Meeting: {rowData.source}</h6>
        </div>
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
                   <a href={item} target='_blank'> <Button variant='solid'>file</Button></a>
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

