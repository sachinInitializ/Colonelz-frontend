import React, { useEffect, useState } from 'react';
import {  getTemplateData } from '../../../data';
import {  TemplateDataItem } from '../../../type';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Dialog } from '@/components/ui';
import type { MouseEvent } from 'react';
import { FaFolder } from 'react-icons/fa';
import { StickyFooter } from '@/components/shared';
import YourFormComponent from '../../TemplateForm';

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

  return (
      <div>
          <div className=" mb-5 flex justify-between">
              <h3 className="">Folder</h3>
              <Button variant="solid" size="sm" onClick={() => openDialog()}>
                  Upload
              </Button>
          </div>
          {templateData.length>0 ? (
              <p>
                  <div className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
                  {templateData.filter(item => item.files[0].folder_name ===type && item.files[0].sub_folder_name_first === folderName).map((item) => (
                      <Card
                          key={item.files[0].folder_id}
                          className=" cursor-pointer"
                          onClick={() =>
                              navigate(
                                  `/app/crm/fileManager/project/templates/residential/subfolder/files?type=${type}&folder=${folderName}&subfolder=${item.files[0].sub_folder_name_second}&folder_id=${item.files[0].folder_id}`,
                              )
                          }
                      >
                          <div className="flex ">
                              <div className={` text-xl mr-3 text-yellow-500`}>
                                  <FaFolder />
                              </div>
                              <p className=" capitalize text-wrap">
                                  {item.files[0].sub_folder_name_second}
                              </p>
                          </div>
                      </Card>
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
