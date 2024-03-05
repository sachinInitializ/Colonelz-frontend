import React, { useEffect, useState } from 'react'
import { FolderItem,fetchLeadData} from './data';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Dialog } from '@/components/ui';
import type { MouseEvent } from 'react'
import YourFormComponent from './LeadForm';
import { FaFolder, FaRegFolder } from 'react-icons/fa';
import { useTheme } from '@emotion/react';
import { StickyFooter } from '@/components/shared';


const Index = () => {
    const [leadData, setLeadData] = useState<FolderItem[]>([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const leadId = queryParams.get('lead_id');
    useEffect(() => {
      const fetchDataAndLog = async () => {
        try {
          const leadData = await fetchLeadData(leadId);
          console.log(leadData);
          setLeadData(leadData[0].files);
        } catch (error) {
          console.error('Error fetching lead data', error);
        }
      };
  
      fetchDataAndLog();
    }, []);
    const navigate=useNavigate()

    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
         setIsOpen(true)
     }
 
     const onDialogClose = (e: MouseEvent) => {
         console.log('onDialogClose', e)
         setIsOpen(false)
     }
     const theme=useTheme
  return (
      <div>
          <div className=" mb-5 flex justify-between">
              <h3 className="">Folder</h3>
              <Button variant="solid" size="sm" onClick={() => openDialog()}>
                  Upload
              </Button>
          </div>
          <div className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
              {leadData.map((item) => (
                  <Card
                      key={item.folder_name}
                      className=" cursor-pointer"
                      onClick={() =>
                          navigate(
                              `/app/crm/fileManager/leads/folder?lead_id=${leadId}&folder_name=${item.folder_name}`,
                          )
                      }
                  >
                      <div className="flex ">
                          <div className={` text-xl mr-3 text-yellow-500`}>
                              <FaFolder />
                          </div>
                          <p className=" capitalize text-wrap">
                              {item.folder_name}
                          </p>
                      </div>
                  </Card>
              ))}
          </div>
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
              <YourFormComponent data={leadData} />
          </Dialog>
      </div>
  )
}

export default Index