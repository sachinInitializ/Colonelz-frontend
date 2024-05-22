import { useMemo, Fragment, useState, useEffect, useContext } from 'react'
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { HiOutlineChevronRight, HiOutlineChevronDown } from 'react-icons/hi'
import type { ApiResponse, MomData } from './data'
import type { ColumnDef, Row, ColumnSort } from '@tanstack/react-table'
import type { ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Dropdown, Notification, toast } from '@/components/ui'
import { apiGetCrmProjectsMom } from '@/services/CrmService'
import { useMomContext } from '../../store/MomContext'
import appConfig from '@/configs/app.config'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Document, Page, Text, View, Image, BlobProvider, StyleSheet, Font, Link } from '@react-pdf/renderer';
Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/VIeViZ2fPtYBt3B2fQZplvesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: 300,
      
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/hlvAxH6aIdOjWlLzgm0jqg.ttf",
      fontWeight: 400
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/4WGKlFyjcmCFVl8pRsgZ9vesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: 500,
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/-zOABrCWORC3lyDh-ajNnPesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: 600,
    }
    ,
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/8JitanEsk5aDh7mDYs-fYfesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: 700,
    }
  ]
});


const styles = StyleSheet.create({
  page: {
    fontFamily:"Times-Roman",
    paddingBottom:10,
    paddingTop:20,
  },
  text: {
    fontWeight:300,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Poppins',
    color:"gray",
    textTransform: 'capitalize',
    
  },
  header:{
  height: 130,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  },

  headerText:{
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: 700,
  },

  subsection:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:50,
    paddingRight:50,
  },
  section: {
    marginBottom: 10,
    fontFamily: 'Poppins',
    fontWeight: 400,
   
  },
  section1: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 14,

  },
  heading: {
    fontSize: 25,
    marginBottom: 20,
    fontFamily: 'Poppins',
    fontWeight: 500,
    textAlign: 'center',
    marginTop:20,

  },
  subheading: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 18,
    marginBottom: 10,
   paddingLeft:50,
   marginTop:10,
  },
  subheading1: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 18,
    marginBottom: 10,
  marginTop:10,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins',
    fontWeight: 400,
  },

  attendees: {
    marginBottom: 10,
  },
  attendeeSection1: {
    paddingLeft: 50,
    paddingRight: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  attendeeSection: {
    marginBottom: 10,
    
  },
  attendeeHeading: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 5,
  },
  attendeeName: {
    fontSize: 12,
    marginBottom: 3,
  },
  image: {
    margin: 10,
    width: 90,
    height: 60,
  },
  remarks:{
    fontFamily: 'Poppins',
    fontWeight: 400,
    paddingLeft:50,
    paddingRight:50,
    color:"gray",
    fontSize:12
  }
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  const year = date.getUTCFullYear()

  return `${day}-${month}-${year}`
}
const MyDocument = (rowData:any) => (
  <Document>
  <Page style={styles.page}>
    <View style={styles.header}>
    <Image style={styles.image} src={'/Images/logo.png'} />
      <Text style={styles.headerText}>Devs Project</Text>
    </View>
      
    
    <View style={styles.section}>
      <Text style={styles.heading}>Meeting Details</Text>
    </View>
    <View style={styles.subsection}>
      <View>
    <View style={styles.section1}>
     <Text style={styles.subtext}>Location:<Text style={styles.text}> {rowData.data.location}</Text></Text>   
    </View>

    <Text style={styles.subheading1}>Attendees</Text>
    <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Client: <Text style={styles.text}>{rowData.data.attendees?.client_name}</Text></Text>
         
        </View>

        <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Organizer:<Text style={styles.text}>{rowData.data.attendees?.organisor}</Text></Text>
          
        </View>

       

       

        </View>

    <View>
    <View style={styles.section1}>
    <Text style={styles.subtext}>Date: <Text style={styles.text}>{formatDate(rowData.data.meetingdate)}</Text></Text> 
    </View>
    <Text style={styles.subheading}> </Text>
    <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Designer:  <Text style={styles.text}>{rowData.data.attendees?.designer}</Text></Text>
        
      
        </View>

    <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Others:<Text style={styles.text}>{rowData.data.attendees?.attendees}</Text></Text>
          
        </View>

        </View>

    </View>
   
    <View style={styles.section}>
      <Text style={styles.subheading}>Remarks</Text>
      <Text style={styles.remarks}>
        {rowData.data.remark?rowData.data.remark:"-"}
      </Text>
    </View>
    <View style={styles.section}>
    <Text style={styles.subheading}>Files</Text>
    <View style={styles.attendees}>
      <View style={styles.attendeeSection1}>
      <View style={styles.attendeeSection}>
        {rowData.data.files.length > 0 ? (
          rowData.data.files.map((file:any) => (
              <Text style={styles.attendeeHeading}>File: <Text style={styles.text}><Link src={file.fileUrl}>{file.fileName}</Link></Text></Text>
          ))
          ) : (
          <Text>No files</Text>
          )}
       
      </View>
      </View>
      </View>
    </View>
  </Page>
</Document>
);

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
                header: () => null, 
                id: 'expander', 
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
                    const date = new Date(row.meetingdate)
                    const day = String(date.getUTCDate()).padStart(2, '0')
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
                    const year = date.getUTCFullYear()
                
                    const formattedDate= `${day}-${month}-${year}`

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
    const projectId = new URLSearchParams(location.search).get('project_id')
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
                <>
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
      
</>
) : (
    <div style={{ textAlign: 'center' }}>No Mom Data</div>
)}
        </>
    )
}

const renderSubComponent = ({ row }: { row: Row<MomData> }) => {
    const location=useLocation()
    const projectId = new URLSearchParams(location.search).get('project_id')

    const rowData = row.original
    const files = Array.isArray(rowData.files) ? rowData.files : []
    const handlePost=async(blob:any)=>{
        const formData = new FormData();
        formData.append('project_id', projectId);
        formData.append('mom_id', rowData.mom_id);
        formData.append('file', blob, 'myDocument1.pdf');
  
       const response=await fetch('https://colonelzadmin.prod.initz.run/v1/api/admin/send/momdata', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
        body: formData,
      });
      const result = await response.json();
      if(result.code===200){
        toast.push(
          <Notification
              type='success' duration={2000}
          >
              MOM Shared Successfully
          </Notification>
        )
      }
      else{
        toast.push(
          <Notification
              type='danger' duration={2000}
          >
              {result.errorMessage}
          </Notification>
        )
      
      }
    }
    const { apiPrefix } = appConfig
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const day = String(date.getUTCDate()).padStart(2, '0')
        const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
        const year = date.getUTCFullYear()
    
        return `${day}-${month}-${year}`
    }
    const Toggle=<BsThreeDotsVertical className='font-semibold text-xl cursor-pointer'/>
    
    return (
        <div>
             <main className="pb-10 ">
        <div className=" dark:bg-gray-950 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-bold">Meeting Details</h2>
              <BlobProvider document={<MyDocument data={rowData} />}>
        {({ blob, url, loading, error }) => {
            if (loading) {
            return <BsThreeDotsVertical className='font-semibold text-xl cursor-pointer'/>;
            }
            if (error) {
            console.error(error);
            return `Error: ${error.message}`;
            }
        
            return (
            <div>
                <span>
              <Dropdown renderTitle={Toggle} placement='bottom-end'>
              <a href={url} target='_blank' rel='noreferrer'    
                    >  
                <Dropdown.Item eventKey="a" >View MOM</Dropdown.Item></a>
                <Dropdown.Item eventKey="b" onClick={()=>handlePost(blob)}>Share MOM</Dropdown.Item>
               
            </Dropdown></span>
            </div>
            );
        }}
        </BlobProvider>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className='flex gap-1 items-center'>
                <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">Location: </p>
                <p className=' text-base'>{rowData.location}</p>
                </div>
                <div className='flex gap-1 items-center'>
                <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">Date: </p>
                <p className=' text-base'>{formatDate(rowData.meetingdate)}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-semibold text-xl">Attendees</p>
                <ul className="space-y-1">
                  <li className=' text-base'><span className='font-semibold text-lg'>Client:</span> {rowData.attendees.client_name?rowData.attendees.client_name:"-"} </li>
                  <li className=' text-base'><span className='font-semibold text-lg'>Organizer:</span> {rowData.attendees.organisor?rowData.attendees.organisor:"-"} </li>
                  <li className=' text-base'><span className='font-semibold text-lg'>Designer:</span> {rowData.attendees.designer?rowData.attendees.designer:"-"} </li>
                  <li className=' text-base'><span className='font-semibold text-lg'>Others:</span> {rowData.attendees.attendees?rowData.attendees.attendees:"-"} </li>
                </ul>
              </div>
            </div>
            <div className='mb-6'>
              <p className="text-gray-500 dark:text-gray-400 font-semibold text-xl ">Remarks</p>
              <p>
                {rowData.remark?rowData.remark:"-"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-semibold text-xl">Files</p>
              <div className="space-y-2">
              {files.length > 0 ? (
                files.map((file) => (
                    <a className="flex items-center gap-2 text-blue-600 hover:underline" href={file.fileUrl} target='_blank'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    {file.fileName.length > 20 ? `${file.fileName.substring(0, 20)}...` : file.fileName}
                    </a>
                ))
                ) : (
                <p>No files</p>
                )}
             
              </div>
            </div>
          </div>
        </div>
      </main>
    
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
