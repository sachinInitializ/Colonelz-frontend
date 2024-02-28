import React, { useState, useEffect } from 'react';
import { HiOutlineBell, HiOutlineMailOpen } from 'react-icons/hi';
import Dropdown from '@/components/ui/Dropdown';
import useResponsive from '@/utils/hooks/useResponsive';
import {  Badge, Button, Tooltip } from '../ui';


interface Notification {
  _id: string;
  status: boolean;
  message: string; // Adjust this based on your actual data structure
  // Add other properties if needed
}
interface DropdownProps {
  title: React.ReactNode;
}

const Notification1 = () => {
  const [notificationData, setNotificationData] = useState<Notification[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://col-u3yp.onrender.com/v1/api/admin/get/notification'); // Replace with your API endpoint
      const data = await response.json();
      if (data.status) {
        setNotificationData(data.data);
      } else {
        // Handle error if needed
        console.error('Error fetching notification data');
      }
    } catch (error) {
      // Handle error if needed
      console.error('Error fetching notification data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const { larger } = useResponsive();

  const handleUpdate = async (notification:Notification) => {
    try {
      const response = await fetch(`https://col-u3yp.onrender.com/v1/api/admin/update/notification`, {
        method: 'PUT', // or 'PUT' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'One',
          notification_id:notification._id
        }),
      });

      const data = await response.json();
      if (data.status) {
        // Update the notification status locally to mark it as read
        setNotificationData((prevData) =>
          prevData.map((item) =>
            item._id === notification._id ? { ...item, status: true } : item
          )
        );
      } else {
        // Handle error if needed
        console.error('Error updating notification status');
      }
    } catch (error) {
      // Handle error if needed
      console.error('Error updating notification status', error);
    }
  };

  const unreadNotifications = notificationData.filter(notification => !notification.status);

 const handleUpdateAll = async () => {
    try {
      const response = await fetch('https://col-u3yp.onrender.com/v1/api/admin/update/notification', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'All',
        }),
      });

      const data = await response.json();
      if (data.status) {
        // Update the status of all notifications locally to mark them as read
        setNotificationData((prevData) =>
          prevData.map((item) => ({ ...item, status: true }))
        );
        // Provide feedback to the user (you can customize this part)
       
      } else {
        // Handle error if needed
        console.error('Error updating all notifications status');
      }
    } catch (error) {
      // Handle error if needed
      console.error('Error updating all notifications status', error);
    }
  };

  return (
    <div>
      <Dropdown
        title={
          <>
            <Badge className="mr-4 text-2xl rounded-md" content={unreadNotifications.length}>
              <HiOutlineBell />
            </Badge>
          </>
        }
        className="mr-2"
        menuClass="p-0 w-[200px] min-w-[250px] md:min-w-[350px] max-h-85 "
        placement={larger.md ? 'bottom-end' : 'bottom-center'}
        style={{ scrollbarWidth: 'none' }}
      >
        <Dropdown.Item variant="header">
          <div className="border-b border-gray-200 dark:border-gray-600 px-6 py-4 flex items-center justify-between mb-4 ">
            <h6>Notifications</h6>
            <Tooltip title="Mark all as read">
              <Button
                variant="plain"
                shape="circle"
                size="sm"
                icon={<HiOutlineMailOpen className="text-xl" />}
                onClick={handleUpdateAll}
              />
            </Tooltip>
          </div>
        </Dropdown.Item>
        <div className="ltr: rtl: text-sm overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="overflow-y-auto h-[250px] pb-8" style={{ scrollbarWidth: 'none' }}>
            {notificationData.slice().reverse().map((notification) => (
              <div
                key={notification._id}
                className={`px-6 py-3 border-b border-gray-200 ${notification.status ? 'read' : 'unread'}`}
                onClick={() => handleUpdate(notification)}
              >
                {/* Customize the notification item based on your data structure */}
                <p
                  style={{
                    color: notification.status ? 'gray' : 'black',
                    fontWeight: notification.status ? 'normal' : 'bold',
                  }}
                >
                  {notification.message}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Dropdown.Item variant="header">
          <div className="flex justify-center px-4 py-2"></div>
        </Dropdown.Item>
      </Dropdown>
      <div></div>
    </div>
  );
};

export default Notification1;