import React, { useState } from 'react';

interface Project {
  project_id: string;
  project_name: string;
  mom: Mom[];
}

interface Mom {
  mom_id: string;
  meetingdate: string;
  source: string;
  attendees: Attendees;
}

interface Attendees {
  client_name: string;
}

interface Props {
  data: Project[];
}

const ProjectTable: React.FC<Props> = ({ data }) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<string>('project_name');
  
    const sortedData = data.slice().sort((a, b) => {
      const columnA = a.mom[0][sortColumn].toString();
      const columnB = b.mom[0][sortColumn].toString();
  
      if (sortOrder === 'asc') {
        return columnA.localeCompare(columnB);
      } else {
        return columnB.localeCompare(columnA);
      }
    });
  
    const toggleSortOrder = (column: string) => {
      setSortColumn(column);
      setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };
  
    return (
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 py-2 px-4" onClick={() => toggleSortOrder('project_name')}>
              Project Name
            </th>
            <th className="border border-gray-300 py-2 px-4" onClick={() => toggleSortOrder('attendees.client_name')}>
              Client Name
            </th>
            <th className="border border-gray-300 py-2 px-4" onClick={() => toggleSortOrder('meetingdate')}>
              Meeting Date
            </th>
            <th className="border border-gray-300 py-2 px-4" onClick={() => toggleSortOrder('location')}>
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((project) =>
            project.mom.map((mom) => (
              <tr key={mom.mom_id}>
                <td className="border border-gray-300 py-2 px-4">{project.project_name}</td>
                <td className="border border-gray-300 py-2 px-4">{mom.attendees.client_name}</td>
                <td className="border border-gray-300 py-2 px-4">{mom.meetingdate}</td>
                <td className="border border-gray-300 py-2 px-4">{mom.source}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  };
  
  export default ProjectTable;