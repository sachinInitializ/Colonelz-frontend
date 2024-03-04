import React, { useState, useEffect } from 'react';
import Cards from './LeadCards';
import { getLeadData } from './data';
import { LeadDataItem } from './type';

const Leads = () => {
  const [leadData, setLeadData] = useState<LeadDataItem[]>([]);

  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const leadData = await getLeadData();
        console.log(leadData);
        setLeadData(leadData);
      } catch (error) {
        console.error('Error fetching lead data', error);
      }
    };

    fetchDataAndLog();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className='grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 text-wrap max-sm:grid-cols-1'>
      {leadData.map((leadItem) => (
        <Cards key={leadItem.lead_id} data={leadItem} />
      ))}
    </div>
  );
};

export default Leads;
