import React, { useState, useEffect } from 'react';
import Cards from './ProjectCards';
import {  getProjectData } from './data';
import { ProjectDataItem } from './type';

const Projects = () => {
  const [projectData, setProjectData] = useState<ProjectDataItem[]>([]);

  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const projectData = await getProjectData();
        console.log(projectData);
        setProjectData(projectData);
      } catch (error) {
        console.error('Error fetching lead data', error);
      }
    };

    fetchDataAndLog();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className='grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5'>
      {projectData.map((projectItem) => (
        <Cards key={projectItem.project_id} data={projectItem} />
      ))}
    </div>
  );
};

export default Projects;
