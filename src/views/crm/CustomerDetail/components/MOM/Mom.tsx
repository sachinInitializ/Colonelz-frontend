import { useMemo, Fragment, useState, useEffect } from 'react';
import Table from '@/components/ui/Table';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import { HiOutlineChevronRight, HiOutlineChevronDown } from 'react-icons/hi';
import type { MomData } from './data';
import type { ColumnDef, Row, ColumnSort, FilterFn } from '@tanstack/react-table';
import type { InputHTMLAttributes, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, DatePicker, Input } from '@/components/ui';
import { useMomContext } from '../../store/MomContext';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import Sorter from '@/components/ui/Table/Sorter';
import { MdDownload } from 'react-icons/md';
import { useRoleContext } from '@/views/crm/Roles/RolesContext';
import { AuthorityCheck } from '@/components/shared';

interface DebouncedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'prefix'> {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <div className="flex justify-end">
            <div className="flex items-center mb-4">
                <Input  
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className=' max-sm:w-full'
                />
            </div>
        </div>
    );
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getUTCFullYear();
  
    return `${day}-${month}-${year}`;
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    let itemValue: any = row.getValue(columnId);
    if (columnId === 'meetingdate') {
        itemValue = formatDate(itemValue);
    } else if (columnId === 'client_name') {
        itemValue = row.original.attendees.client_name;
    }

    const itemRank = rankItem(itemValue, value);
    addMeta({ itemRank });

    return itemRank.passed;
};


type ReactTableProps<T> = {
    renderRowSubComponent: (props: { row: Row<T> }) => ReactElement;
    getRowCanExpand: (row: Row<T>) => boolean;
    data: Data;
};

type Data = {
    client_name: string;
    mom: MOM[];
};

type MOM = {
    mom_id: string;
};

const { Tr, Th, Td, THead, TBody } = Table;

function ReactTable({
    renderRowSubComponent,
    getRowCanExpand,
}: ReactTableProps<MomData>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

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
            {
                header: 'Client Name',
                accessorKey: 'client_name',
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
                cell: (props) => {
                    const row = props.row.original;
                    const date = new Date(row.meetingdate);
                    const formattedDate = formatDate(row.meetingdate);

                    return <div>{formattedDate}</div>;
                },
            },
            {
                header: 'Location',
                accessorKey: 'location',
            },
        ],
        []
    );

    const location = useLocation();
    const { leadData } = useMomContext();
    const { client } = useMomContext();
    const {roleData}=useRoleContext()
    const projectId = new URLSearchParams(location.search).get('project_id');

    const [sorting, setSorting] = useState<ColumnSort[]>([]);
    

    const table = useReactTable({
        data: leadData || [],
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        getRowCanExpand,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugHeaders: true,
        debugColumns: false,
    });

    const navigate = useNavigate();
    const { DatePickerRange } = DatePicker;
    const filteredRows = table.getRowModel().rows.filter((row) => {
        const [startDate, endDate] = dateRange;
        const rowDate = new Date(row.original.meetingdate); // Adjust according to your data structure
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
    
        if (start && end) {
            return rowDate >= start && rowDate <= end;
        }
        return true; 
    });

    return (
        <>
            <div className="flex justify-end sm:flex-row flex-col mb-4 gap-3">
                <DatePickerRange
                    placeholder="Select dates range"
                    value={dateRange}
                    onChange={(dates) => setDateRange(dates)}
                    className='flex justify-end lg:!w-48'
                    
                />

                <DebouncedInput
                    value={globalFilter ?? ''}
                    className="p-2 font-lg shadow border border-block max-sm:w-full"
                    placeholder="Search..."
                    onChange={(value) => setGlobalFilter(String(value))}
                />
                <AuthorityCheck
                    userAuthority={[`${localStorage.getItem('role')}`]}
                    authority={roleData?.data?.quotation?.read??[]}
                    >
                <Button
                    className="flex justify-center items-center"
                
                    variant="solid"
                    onClick={() =>
                        navigate(
                            `/app/crm/project/momform?project_id=${projectId}&client_name=${client?.client_name}`,
                        )
                    }
                >
                    Add MOM{' '}
                </Button>
                </AuthorityCheck>
                <Button
                    variant="solid"
                    onClick={() =>
                        navigate(`/app/crm/project/AllMOM?project_id=${projectId}`)
                    }
                >
                    View All MOM
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
                                                    {header.id !== 'expander' && (
                                                        <Sorter sort={header.column.getIsSorted()} />
                                                    )}
                                                </div>
                                            )}
                                        </Th>
                                    ))}
                                </Tr>
                            ))}
                        </THead>
                        <TBody>
                            {filteredRows.slice(0, 10).map((row) => (
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
    );
}




const renderSubComponent = ({ row }: { row: Row<MomData> }) => {
  const rowData = row.original;
 
  const files = Array.isArray(rowData.files) ? rowData.files : [];

  const printContent = `
 <html>
    <head>
      <title>Meeting Details - ${rowData.mom_id}</title>
      <style>
        body { font-family: Arial, sans-serif; }
        .parts { display: flex; justify-content: space-between;}
        .content { padding: 20px; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 1.2em; font-weight: bold; }
        .section-content { margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="content">
        <div class="parts">
        <div class="section">
          <div class="section-title">Meeting Details</div>
          <div class="section-content">
            <p><strong>Location:</strong> ${rowData.location}</p>
            <p><strong>Date:</strong> ${formatDate(rowData.meetingdate)}</p>
          </div>
        </div>
        <div class="section">
          <div class="section-title">Attendees</div>
          <div class="section-content">
            <p><strong>Client:</strong> ${rowData.attendees.client_name || '-'}</p>
            <p><strong>Organizer:</strong> ${rowData.attendees.organisor || '-'}</p>
            <p><strong>Others:</strong> ${rowData.attendees.attendees || '-'}</p>
          </div>
        </div>
    </div>
        <div class="section">
          <div class="section-title">Remarks</div>
          <div class="section-content">${rowData.remark || 'No remarks'}</div>
        </div>
        <div class="section">
          <div class="section-title">Files</div>
          <div class="section-content">
            ${files.length > 0
              ? files.map(
                  (file) => `<a href="${file.fileUrl}" target="_blank">${file.fileName}</a><br/>`
                ).join('')
              : 'No files attached'}
          </div>
        </div>
      </div>
    </body>
    </html>
`;

const handlePrint = () => {
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow?.document.write(printContent);
  printWindow?.document.close();
  printWindow?.focus();
  printWindow?.print();
};


  return (
      <div>
          <main className="pb-10">
              < div  className="dark:bg-gray-950 rounded-lg p-6">
                  <div className="space-y-4">
                      <div className="flex justify-between mb-8">
                          <h2 className="text-2xl font-bold">Meeting Details</h2>
                          <Button onClick={handlePrint} variant='solid' size='sm' className='flex justify-center items-center gap-2'><span>Download</span><span><MdDownload/></span></Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <div className="flex gap-1 items-center">
                                  <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">Location: </p>
                                  <p className="text-base">{rowData.location}</p>
                              </div>
                              <div className="flex gap-1 items-center">
                                  <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">Date: </p>
                                  <p className="text-base">{formatDate(rowData.meetingdate)}</p>
                              </div>
                          </div>
                          <div>
                              <p className="text-gray-500 dark:text-gray-400 font-semibold text-xl">Attendees</p>
                              <ul className="space-y-1">
                                  <li className="text-base"><span className="font-semibold text-lg">Client:</span> {rowData.attendees.client_name ? rowData.attendees.client_name : '-'}</li>
                                  <li className="text-base"><span className="font-semibold text-lg">Organizer:</span> {rowData.attendees.organisor ? rowData.attendees.organisor : '-'}</li>
                                  <li className="text-base"><span className="font-semibold text-lg">Others:</span> {rowData.attendees.attendees ? rowData.attendees.attendees : '-'}</li>
                              </ul>
                          </div>
                      </div>
                      <div className="mb-6">
                          <p className="text-gray-500 dark:text-gray-400 font-semibold text-xl">Remarks</p>
                          <div className="remark-content" dangerouslySetInnerHTML={{ __html: rowData.remark }} />
                      </div>
                      <div>
                          <p className="text-gray-500 dark:text-gray-400 font-semibold text-xl">Files</p>
                          <div className="space-y-2">
                              {files.length > 0 ? (
                                  files.map((file, index) => (
                                      <a key={index} className="flex items-center gap-2 text-blue-600 hover:underline" href={file.fileUrl} target='_blank'>
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
  );
};


const SubComponent = ({ data }: any) => {
    return (
        <ReactTable
            renderRowSubComponent={renderSubComponent}
            getRowCanExpand={() => true}
            data={data}
        />
    )
}

export default SubComponent
