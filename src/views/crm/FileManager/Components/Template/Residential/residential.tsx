import React, { useEffect, useState } from 'react'
import { FaFolder } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../Footer'
import { getTemplateData } from '../../data'

const Residential = () => {
    const navigate=useNavigate()
    const [data,setData]=useState([])
    useEffect(() => {
      const fetchDataAndLog = async () => {
        try {
          const templateData = await getTemplateData();
          console.log(templateData);
      
          const folderSubFolderPairs = [
            { folder_name: 'residential', sub_folder_name_first: 'designing' },
            { folder_name: 'residential', sub_folder_name_first: 'executing' },
          ];
      
          const results = [];
      
          for (const pair of folderSubFolderPairs) {
            const filteredData = templateData.flatMap(
              (item) =>
                item.files.filter(
                  (file) =>
                    file.folder_name === pair.folder_name &&
                    file.sub_folder_name_first === pair.sub_folder_name_first
                )
            );
      
            for (const pair of folderSubFolderPairs) {
              const filteredData = templateData.flatMap(
                (item) =>
                  item.files.filter(
                    (file) =>
                      file.folder_name === pair.folder_name &&
                      file.sub_folder_name_first === pair.sub_folder_name_first
                  )
              );
            
              if (filteredData.length > 0) {
                const uniqueSubFolderSecond = [...new Set(filteredData.map(file => file.sub_folder_name_second))];
                results.push({
                  folder_name: pair.folder_name,
                  sub_folder_name_first: pair.sub_folder_name_first,
                  total_unique_sub_folder_name_second: uniqueSubFolderSecond.length,
                  updated_date: filteredData[0].updated_date,
                });
              }
            }
            
            console.log(results);
          setData(results);}
        } catch (error) {
          console.error('Error fetching lead data', error);
        }
      };
      
      fetchDataAndLog();
    }, []);
    console.log(data);
  return (
    <>
    <div>
      <h3 className='mb-8'>Company Data</h3>
    <div className="h-screen w-full">
            <div className="flex-1 p-4">
            <div className="flex items-center mb-4">
        <nav className="flex">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">FileManager</a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Company Data</a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
          
            <li className="text-gray-500">Residential</li>
          </ol>
        </nav>
      </div>
      
              <div className="border rounded-lg shadow-sm dark:border-gray-700">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&amp;_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                          Name
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                          Type
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                          Size
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                          Modified
                        </th>
                       
                      </tr>
                    </thead>
                 
                  
                <tbody className="[&amp;_tr:last-child]:border-0">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="h-5 w-5 text-gray-500 dark:text-gray-400"
                        >
                          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
                        </svg>
                        <a className="font-medium cursor-pointer" onClick={()=>navigate('/app/crm/fileManager/project/templates/residential/subfolder?type=residential&folder=designing')}>
                          Design
                        </a>
                      </div>
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">Folder</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{Number(data[0]?.total_unique_sub_folder_name_second)>0?`${data[0]?.total_unique_sub_folder_name_second} items`:`${data[0]?.total_unique_sub_folder_name_second} item`}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{formatDate(data[0]?.updated_date)}</td>
                    
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="h-5 w-5 text-gray-500 dark:text-gray-400"
                        >
                          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
                        </svg>
                        <a className="font-medium cursor-pointer" onClick={()=>navigate('/app/crm/fileManager/project/templates/residential/subfolder?type=residential&folder=executing')}>
                        Design and Execution
                        </a>
                      </div>
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">Folder</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{Number(data[1]?.total_unique_sub_folder_name_second)>1?`${data[1]?.total_unique_sub_folder_name_second} items`:`${data[1]?.total_unique_sub_folder_name_second} item`}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{formatDate(data[1]?.updated_date)}</td>
                    
                  </tr>
                
                </tbody>
      
                  </table>
                </div>
              </div>
            </div>
          </div>
    <Footer/>
    </div>
    </>
  )
}

export default Residential