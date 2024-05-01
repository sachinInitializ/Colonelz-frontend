import React, { useEffect, useState } from 'react';
import {  getTemplateData } from '../../../data';
import {  TemplateDataItem } from '../../../type';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Dialog } from '@/components/ui';
import type { MouseEvent } from 'react';
import YourFormComponent from '../../TemplateForm';
import Footer from '@/views/crm/FileManager/Footer';
import { HiTrash } from 'react-icons/hi';

const Index = () => {
  const [templateData, setTemplateData] = useState<TemplateDataItem[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const folderName = queryParams.get('folder');
  const type='commercial'
  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const templateData = await getTemplateData();
        console.log(templateData);
        setTemplateData(templateData);
      } catch (error) {
        console.error('Error fetching lead data', error);
      }
    };

    fetchDataAndLog();
  }, []);
  console.log(templateData);
  
  const navigate = useNavigate();

  const [dialogIsOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = (e: MouseEvent) => {
    console.log('onDialogClose', e);
    setIsOpen(false);
  };

  function formatDate(dateString:string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
      <div>
          <div className=" mb-5 flex justify-between">
              <h3 className="">Folder</h3>
              <Button variant="solid" size="sm" onClick={() => openDialog()}>
                  Upload
              </Button>
          </div>
          {templateData.length>0 ? (
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
              <li>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Commercial</a>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
            
              <li className="text-gray-500">{folderName}</li>
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
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0  ">
                            Actions
                          </th>
                        </tr>
                      </thead>
                   
                    
                  <tbody className="[&amp;_tr:last-child]:border-0">
                  {templateData.filter(item => item.files && item.files[0] && item.files[0].folder_name === type && item.files[0].sub_folder_name_first === folderName).map((item) => (
                  item.files && item.files[0] ? (
                    
                    <tr key={item.files[0].folder_id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
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
                          <a className="font-medium cursor-pointer" onClick={() =>
                        navigate(
                          `/app/crm/fileManager/project/templates/residential/subfolder/files?type=${type}&folder=${folderName}&subfolder=${item.files[0].sub_folder_name_second}&folder_id=${item.files[0].folder_id}`,
                        )
                      }>
                            {item.files[0].sub_folder_name_second}
                          </a>
                        </div>
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">Folder</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{Number(item.files[0].total_files)>1?`${item.files[0].total_files} items`:`${item.files[0].total_files} item`}</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{formatDate(item.files[0].updated_date)}</td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center">
                        <div className=' flex justify-center'>
                      <HiTrash className=' text-xl text-center hover:text-red-500'/>
                      </div>
                      </td>
                    </tr>):null))}
                  
                  </tbody>
        
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
             <p>No folders available. Click the button above to add folders.</p>
          )}
         <Footer/>
          <Dialog
              isOpen={dialogIsOpen}
              onClose={onDialogClose}
              onRequestClose={onDialogClose}
          >
              <YourFormComponent/>
          </Dialog>
      </div>
  )
};

export default Index;
