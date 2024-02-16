import React, { useState } from 'react';
import { userDetailData } from '@/mock/data/usersData';
import { HiOutlineBell } from 'react-icons/hi';
import Dropdown from '@/components/ui/Dropdown';
import { Tooltip } from 'react-tooltip';

import useResponsive from '@/utils/hooks/useResponsive';

const Notification1 = () => {
  const [showNotification, setShowNotification] = useState(false);

  const projects = userDetailData; // Assuming userDetailData contains your project data

  const handleClick = () => {
    setShowNotification(!showNotification);
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
          <>
          <Dropdown.Item key={project._id} onClick={handleClick} className=''>
            <p>{`1 day left for project "${project.project_name}"`}</p>
          </Dropdown.Item>
          <hr />
          </>
        );
      } else if (currentDate >= timelineDate) {
        return (
          <>
          <Dropdown.Item key={project._id} className='text-wrap'>
            <p>{`Project "${project.project_name}" delayed. Extend timeline.`}</p>
          </Dropdown.Item>
          </>
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
        menuClass="p-0 w-[200px] min-w-[250px] md:min-w-[300px] max-h-80 overflow-y-auto" // Set max height and enable vertical scrolling
        placement={larger.md ? 'bottom-end' : 'bottom-center'}
        onClick={handleClick}
      >
        <Dropdown.Item variant="header">
          <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
            <h6>Notifications</h6>
          </div>
        </Dropdown.Item>
        <div className='ltr:ml-3 rtl:mr-3'>
          {showNotification && renderNotifications()}
        </div>
        <Dropdown.Item variant="header">
          <div className="flex justify-center border-t border-gray-200 dark:border-gray-600 px-4 py-2">
          </div>
        </Dropdown.Item>
      </Dropdown>
      <div></div>
    </div>
  );
};

export default Notification1;
