import { useMemo, Fragment, useState, useEffect, useContext } from 'react'
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
import {  projectId } from './data'
import { HiOutlineChevronRight, HiOutlineChevronDown } from 'react-icons/hi'
import type { ApiResponse, MomData } from './data'
import type { ColumnDef, Row, ColumnSort } from '@tanstack/react-table'
import type { ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Notification, toast } from '@/components/ui'
import { apiGetCrmProjectsMom } from '@/services/CrmService'
import { useMomContext } from '../../store/MomContext'

type ReactTableProps<T> = {
    renderRowSubComponent: (props: { row: Row<T> }) => ReactElement
    getRowCanExpand: (row: Row<T>) => boolean
    data: Data
}
type Data = {
    client_name:string,
    mom: MOM[]
}
type MOM = {
    mom_id: string
}

const { Tr, Th, Td, THead, TBody } = Table

function ReactTable({
    renderRowSubComponent,
    getRowCanExpand,
    
}: ReactTableProps<MomData>) {
    const columns = useMemo<ColumnDef<MomData>[]>(
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
                subCell: () => null, 
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
                    const row = props.row.original
                    const clientNames = Array.isArray(
                        row.attendees?.client_name,
                    )
                        ? row.attendees.client_name
                        : [row.attendees.client_name]

                    return <span>{clientNames.join(', ')}</span>
                },
            },
            {
                header: 'Meeting Date',
                accessorKey: 'meetingdate',
                cell: (props) => {
                    const row = props.row.original
                    const originalDate = new Date(row.meetingdate)

                    // Formatting the date in dd-mm-yyyy format
                    const formattedDate = `${originalDate
                        .getDate()
                        .toString()
                        .padStart(2, '0')}-${(originalDate.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}-${originalDate.getFullYear()}`

                    return <div>{formattedDate}</div>
                },
            },
            {
                header: 'Location',
                accessorKey: 'location',
            },
        ],
        [],
    )

    const location = useLocation()
    const { leadData, client } = useMomContext();
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

    const navigate = useNavigate()

    return (
        <>
            <div className="flex justify-end mb-4">
                <Button
                    className="flex justify-center items-center"
                    size="sm"
                    variant="solid"
                    onClick={() =>
                        navigate(
                            `/app/crm/project/momform?project_id=${projectId}&client_name=${client?.client_name}`
                        )
                    }
                >
                    Add MOM{' '}
                </Button>
            </div>
            {table.getRowModel().rows.length > 0 ? (
    <Table>
        <THead>
            {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <Th key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder ? null : (
                                <div
                                    {...{
                                        className: header.column.getCanSort()
                                            ? 'cursor-pointer select-none'
                                            : '',
                                        onClick: header.column.getToggleSortingHandler(),
                                    }}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </div>
                            )}
                        </Th>
                    ))}
                </Tr>
            ))}
        </THead>
        <TBody>
            {table.getRowModel().rows.slice(0, 10).map((row) => (
                <Fragment key={row.id}>
                    <Tr>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </Tr>
                    {row.getIsExpanded() && (
                        <Tr>
                            <Td colSpan={row.getVisibleCells().length}>
                                {renderRowSubComponent({ row })}
                            </Td>
                        </Tr>
                    )}
                </Fragment>
            ))}
        </TBody>
    </Table>
) : (
    <div style={{ textAlign: 'center' }}>No Mom Data</div>
)}
        </>
    )
}

const renderSubComponent = ({ row }: { row: Row<MomData> }) => {
    const rowData = row.original
    const files = Array.isArray(rowData.files) ? rowData.files : []
    const handleShareMOM = async () => {
        try {
            const response = await fetch(
                `https://col-back1.test.psi.initz.run/v1/api/admin/send/momdata?project_id=${projectId}&mom_id=${rowData.mom_id}`,
                {
                    method: 'GET',
                },
            )
            const responseData=await response.json()
            console.log(responseData);
            
            if (response.ok) {
                toast.push(
                    <Notification closable type="success" duration={2000}>
                        "MOM shared successfully"
                    </Notification>
                )
            } else {
                toast.push(
                    <Notification closable type="danger" duration={2000}>
                        {responseData.errorMessage}
                    </Notification>
                )
            }
        } catch (error) {
            console.error('Error sharing MOM:', error)
            alert(
                'An error occurred while sharing MOM. Please try again later.',
            )
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h6>
                    Date:{' '}
                    {new Date(rowData.meetingdate).toISOString().split('T')[0]}
                </h6>
                <div className="grid grid-cols-2 gap-2">
                    <a
                        href={`https://col-back1.test.psi.initz.run/v1/api/admin/generate/pdf?project_id=${projectId}&mom_id=${rowData.mom_id}`}
                        target="_blank" rel="noreferrer"
                    >
                        <Button variant="solid" size="sm">
                            View MOM
                        </Button>
                    </a>
                    <Button variant="solid" size="sm" onClick={handleShareMOM}>
                        Share MOM
                    </Button>
                </div>
            </div>
            <h6 className=" capitalize">Location: {rowData.location}</h6>
            <div className="mt-4">
                <h5 className=" mt-3">Meeting attendees</h5>
                <p>Client's Name: {rowData.attendees.client_name}</p>
                <p>Oraganised By: {rowData.attendees.organisor}</p>
                <p>Designer: {rowData.attendees.designer}</p>
                <p>attendees: {rowData.attendees.attendees}</p>
            </div>
            <div className="mt-4">
                <h5 className=" mt-3">Remarks</h5>
                <p className=' text-wrap' style={{ width: '65vw', overflowWrap: 'break-word' }}>{rowData.remark}</p>
            </div>

            <div className="grid grid-cols-10  mt-6">
                {files.map((item) => (
                    <div  key={item}>
                        <a href={item.fileUrl} target="_blank"  rel="noreferrer">
                            <Button variant="solid" className=" capitalize">
                                File
                            </Button>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

const SubComponent = ({ data }: ApiResponse) => {
    return (
        <ReactTable
            renderRowSubComponent={renderSubComponent}
            getRowCanExpand={() => true}
            data={data}
        />
    )
}

export default SubComponent
