import React, { useEffect, useState } from 'react';
import {  getTemplateData } from '../../data';
import {  TemplateDataItem } from '../../type';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Dialog } from '@/components/ui';
import type { MouseEvent } from 'react';
import { FaFolder } from 'react-icons/fa';
import { StickyFooter } from '@/components/shared';
import YourFormComponent from '../TemplateForm';

const Index = () => {
  const [templateData, setTemplateData] = useState<TemplateDataItem[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const folderName = queryParams.get('folder');
  const type='miscellaneous'
  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const templateData = await getTemplateData();
       
        setTemplateData(templateData);
      } catch (error) {
        console.error('Error fetching lead data', error);
      }
    };

    fetchDataAndLog();
  }, []);
  
  const navigate = useNavigate();

  const [dialogIsOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = (e: MouseEvent) => {
    console.log('onDialogClose', e);
    setIsOpen(false);
  };
console.log(templateData);



  return (
      <div>
          <div className=" mb-5 flex justify-between">
              <h3 className="">Folder</h3>
              <Button variant="solid" size="sm" onClick={() => openDialog()}>
                  Upload
              </Button>
          </div>
          {templateData && templateData.length>0 ? (
              <p>
                  <div className="grid xl:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-3">
                  {templateData.filter(item => item.files[0].folder_name ===type && item.files[0].sub_folder_name_first === folderName).map((item) => (
                      <div
                          key={item.files[0].folder_id}
                          className=" cursor-pointer"
                          onClick={() =>
                              navigate(
                                  `/app/crm/fileManager/project/templates/miscellaneous/subfolder/files?type=${type}&folder=${folderName}&subfolder=${item.files[0].sub_folder_name_second}&folder_id=${item.files[0].folder_id}`,
                              )
                          }
                      >
                          <div className='flex flex-col justify-center items-center gap-1'>
      <div className={` text-xl mr-3 text-yellow-500`}>
                                  <FaFolder />
                              </div>
     <p> {item.files[0].sub_folder_name_second}</p>
      </div>
                      </div>
                  ))}
              </div>
              </p>
          ) : (
             <p>No folders available. Click the button above to add folders.</p>
          )}
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
                          navigate(-1)
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
          >
             <YourFormComponent/> 
          </Dialog>
      </div>
  )
};

export default Index;
