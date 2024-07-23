import React, { useEffect, useState } from 'react';
import { FolderItem, fetchProjectData } from './data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Dialog, Notification, Skeleton, toast } from '@/components/ui';
import type { MouseEvent } from 'react';
import YourFormComponent from './ProjectForm';
import { FaFolder } from 'react-icons/fa';
import { ConfirmDialog, StickyFooter } from '@/components/shared';
import { HiTrash } from 'react-icons/hi';
import { apiDeleteFileManagerFolders } from '@/services/CrmService';
import { useMemo} from 'react'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnDef, FilterFn, ColumnFiltersState } from '@tanstack/react-table'
import type { InputHTMLAttributes } from 'react'
import NoData from '@/views/pages/NoData';
import TableRowSkeleton from '@/components/shared/loaders/TableRowSkeleton';

interface DebouncedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'prefix'> {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <div className="flex justify-end">
            <div className="flex items-center mb-4">
                <span className="mr-2">Search:</span>
                <Input
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    
    const itemRank = rankItem(row.getValue(columnId), value)

    addMeta({
        itemRank,
    })
    return itemRank.passed
}





const Index = () => {
  const [projectData, setProjectData] = useState<FolderItem[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get('project_id');
  const projectName = queryParams.get('project_name');
  const role=localStorage.getItem('role')
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [dialogIsOpen, setIsOpen] = useState(false);
  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = (e: MouseEvent) => {
    console.log('onDialogClose', e);
    setIsOpen(false);
  };

const [dialogIsOpen2, setIsOpen2] = useState(false)
const [folderName, setFolderName] = useState<string>('')

const openDialog2 = (folder_name:string) => {
    setIsOpen2(true)
    setFolderName(folder_name)
}

const onDialogClose2 = () => {
    setIsOpen2(false)
}


  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        setIsLoading(true);
        const projectData = await fetchProjectData(projectId);
        console.log(projectData);
        setProjectData(projectData);
      } catch (error) {
        console.error('Error fetching lead data', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDataAndLog();
  }, [projectId]);




const deleteFolders = async (folder_name:string) => {
  function warn(text:string) {
    toast.push(
        <Notification closable type="warning" duration={2000}>
            {text}
        </Notification>,{placement:'top-center'}
    )
}
  if (folder_name.length === 0) {
    warn('No files selected for deletion.')
    return;
  }   
  const postData = {
    lead_id:"",
    folder_name: folder_name,
    type:"",
    project_id:projectId
  };
  try {
    await apiDeleteFileManagerFolders(postData);
    toast.push(
      <Notification closable type="success" duration={2000}>
        Folder deleted successfully
      </Notification>,{placement:'top-center'}
    )
    window.location.reload()
  } catch (error) {
    toast.push(
      <Notification closable type="danger" duration={2000}>
        Error deleting folder
      </Notification>,{placement:'top-center'}
    )
  }
  
}

function formatDate(dateString:string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
const [globalFilter, setGlobalFilter] = useState('')

const columns = useMemo<ColumnDef<FolderItem>[]>(
    () => [
        { header: 'Name', accessorKey: 'folder_name'
        , cell: ({row}) => {
            return(
                <div>
                <div className="flex items-center gap-2">
                  <FaFolder/>
                  <a className="font-medium cursor-pointer" onClick={()=> navigate(
                              `/app/crm/fileManager/project/folder?project_id=${projectId}&project_name=${projectName}&folder_name=${row.original.folder_name}`,
                          )}>
                    {row.original.folder_name}
                  </a>
                </div>
              </div>
            )
          }},
         
        { header: 'Type', cell: ({row}) => {
            return(
                <div>Folder</div>
            )
        }},
        { header: 'Files', accessorKey: 'total_files' },
        { header: 'Modified', accessorKey: 'updated_date', cell: ({row}) => {
            const date=row.original.updated_date
            return(
                <div>{formatDate(date)}</div>
            )
        }
        },

        {
            header: 'Actions',
            id: 'actions',
            cell: ({row}) => {
                return(
                    <div className=' ml-3 cursor-pointer' onClick={()=>openDialog2(row.original.folder_name)}>
                  <HiTrash className=' text-xl text-center hover:text-red-500'/>
                  </div>
                )
            }
        },
    ],
    []
)


const filteredProjectData = useMemo(() => {
  if (role === 'Executive Assistant') {
    return projectData.filter(item => 
      item.folder_name.toLowerCase() === 'procurement' || 
      item.folder_name.toLowerCase() === 'quotation'
    );
  }
  else if (role === '3D Visualizer' || role==="Project Architect" || role==="Jr. Interior Designer" || role==="Site Supervisor") {
    return projectData.filter(item => 
      item.folder_name.toLowerCase() !== 'contract' && 
      item.folder_name.toLowerCase() !== 'quotation' && 
      item.folder_name.toLowerCase() !== 'procurement data'
    );
  }
  return projectData;
}, [projectData, role]);

const table = useReactTable({
    data:filteredProjectData,
    columns,
    filterFns: {
        fuzzy: fuzzyFilter,
    },
    state: {
        columnFilters,
        globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugHeaders: true,
    debugColumns: false,
})



  return (
      <div>
          <div className=" mb-5 flex justify-between">
              <h3 className=" capitalize">Project-{projectName}</h3>
              <Button variant="solid" size="sm" onClick={() => openDialog()}>
                  Upload
              </Button>
          </div> 
            <>
    <div className=' flex justify-between'>
    <div className="flex items-center mb-4">
  <nav className="flex">
    <ol className="flex items-center space-x-2">
      <li>
      <Link to={`/app/crm/fileManager`} className="text-blue-600 dark:text-blue-400 hover:underline">FileManager</Link>
      </li>
      <li>
        <span className="mx-2">/</span>
      </li>
      <li className="text-gray-500">Projects</li>
    
    </ol>
  </nav>
</div>
            <DebouncedInput
                value={globalFilter ?? ''}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search all columns..."
                onChange={(value) => setGlobalFilter(String(value))}
            />
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
                                        {header.isPlaceholder  || header.id === 'actions' ? null : (
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
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                {isLoading?<TableRowSkeleton
                      avatarInColumns= {[0]}
                      columns={columns.length}
                      avatarProps={{ width: 14, height: 14 }}
                  />:projectData.length === 0?<Td colSpan={columns.length}><NoData/></Td>:
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>}
            </Table>
        </>
          


          <StickyFooter
              className="-mx-8 px-8 flex items-center justify-between py-4 mt-7"
              stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
              <div className="md:flex items-center">
                  <Button
                      size="sm"
                      className="ltr:mr-3 rtl:ml-3"
                      type="button"
                      onClick={() => {
                          navigate('/app/crm/fileManager')
                      }}
                  >
                      Back
                  </Button>
              </div>
          </StickyFooter>
          <Dialog
              isOpen={dialogIsOpen}
              onClose={onDialogClose}
              onRequestClose={onDialogClose}
              className={`h-300px`}
          >
              <YourFormComponent data={projectData} />
          </Dialog>

          <ConfirmDialog
          isOpen={dialogIsOpen2}
          type="danger"
          onClose={onDialogClose2}
          confirmButtonColor="red-600"
          onCancel={onDialogClose2}
          onConfirm={() => deleteFolders(folderName)}
          title="Delete Folder"
          onRequestClose={onDialogClose2}>
            <p> Are you sure you want to delete this folder? </p>            
        </ConfirmDialog>
      </div>
  )
};

export default Index;
