import React, { useState } from 'react';
import { userDetailData } from '@/mock/data/usersData';
import { HiOutlineBell } from 'react-icons/hi';
import Dropdown from '@/components/ui/Dropdown';
import { Tooltip } from 'react-tooltip';
import { productsData } from '@/mock/data/salesData';

import useResponsive from '@/utils/hooks/useResponsive';
import { ScrollBar } from '../ui';

const Notification1 = () => {
  const [showNotification, setShowNotification] = useState(false);

  const projects = userDetailData; // Assuming userDetailData contains your project data
  const leads=productsData;
 
 
  
  const handleClick = () => {
    setShowNotification(true);
  };

const renderLeadsNotifications = () => {
  if (!leads || !Array.isArray(leads)) {
    return null;
  }

  return leads.map((lead) => {
    const currentDate = new Date();
    const parsedDateTime: Date = new Date(lead.updated_date);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    
    };

    const currentDateTime: string = currentDate.toLocaleDateString('en-IN', options);
    const formattedDateTime: string = parsedDateTime.toLocaleString('en-IN', options);

    const timeDiff = Math.ceil((parsedDateTime - currentDate) / (1000 * 60 * 60 * 24));

    if (timeDiff === 1) {
      return (
        <div key={lead.id}>
          <p className=' px-5 py-3'>{`1 day remaining to follow up for lead ${lead.name} updated on ${formattedDateTime}`}</p>
          <hr className='my-2' />
        </div>
      );
    } else if (timeDiff === 0) {
      return (
        <div key={lead.id}>
          <p className='px-5 py-3'>{`Today is the day to follow up for lead ${lead.name} updated on ${formattedDateTime}`}</p>
          <hr className='my-2' />
        </div>
      );
    }

    return null;
  });
};


  const renderNotifications = () => {
    if (!projects || !Array.isArray(projects)) {
      return null; // Return early if projects is not defined or not an array
    }

    return projects.map((project) => {
      const currentDate = new Date();
      const timelineDate = new Date(project.timeline_date);
      
    
      
      // Calculate time difference in days
      const timeDiff = Math.ceil((timelineDate - currentDate) / (1000 * 60 * 60 * 24));


      if (timeDiff === 1) {
        return (
          < div style={{scrollbarWidth:"none"}} className=' text-sm' key={project._id}>
            <p className=' text-sm px-5 py-3'>{`1 day left for project "${project.project_name}"`}</p>
          
          <hr className='my-2' />
          </div>
        );
      } else if (currentDate >= timelineDate && timeDiff>=-500) {
        return (
          <div key={project._id}>
            <p className=' text-sm px-5 py-3'>{`Project "${project.project_name}" delayed. Extend timeline.`}</p>
          <hr className='my-2 w-full'/>
          </div>
        );
      }
      return null;
    });
  };

  const { larger } = useResponsive();

  return (
    <div>
      <Dropdown
        title={<HiOutlineBell className='text-xl' />}
        className="mr-2"
        menuClass="p-0 w-[200px] min-w-[250px] md:min-w-[350px] max-h-80 " // Set max height and enable vertical scrolling
        placement={larger.md ? 'bottom-end' : 'bottom-center'}
        onClick={handleClick}
        style={{scrollbarWidth:"none"}}
      >
        <Dropdown.Item variant="header">
          <div className="border-b border-gray-200 dark:border-gray-600 px-6 py-4 flex items-center justify-between mb-4 ">
            <h6>Notifications</h6>
          </div>
        </Dropdown.Item>
        <div className='ltr: rtl: text-sm overflow-y-auto' style={{scrollbarWidth:"none"}}>
          <div className=' overflow-y-auto h-[250px] pb-8' style={{scrollbarWidth:"none"}}>
          {showNotification && renderNotifications()}
          {showNotification && renderLeadsNotifications()}
          </div>
        </div>
        <Dropdown.Item variant="header">
          <div className="flex justify-center  px-4 py-2">
          </div>
        </Dropdown.Item>
      </Dropdown>
      <div></div>
    </div>
  );
};

export default Notification1;
