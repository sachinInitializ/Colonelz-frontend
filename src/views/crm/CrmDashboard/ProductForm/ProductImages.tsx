import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from '@/components/ui/DatePicker/DatePicker';


interface ProjectFormProps {
  // Add any additional props if needed
}

const ProjectForm: React.FC<ProjectFormProps> = (props) => {
  const [formData, setFormData] = useState({
    role: 'ADMIN',
    project_name: '',
    client_name: '',
    client_contact: '',
    client_email: '',
    project_type: '',
    description: '',
    leadmanager: '',
    junior_designer: '',
    senior_designer: '',
    supervisor: '',
    visualizer: '',
    project_status: '',
    project_start_date: new Date(),
    timeline_date: new Date(),
    project_end_date: new Date(),
    project_budget: '',
    project_location: '',
    id: '65c32e19e0f36d8e1f30955c',
    files: [],
  });

  const projectTypeOptions = [
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Residential', label: 'Residential' },
  ];

  const projectStatusOptions = [
    { value: 'Completed', label: 'Completed' },
    { value: 'Execution', label: 'Execution' },
    { value: 'Design', label: 'Design' },
  ];

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Project Type:</label>
        <Select
          options={projectTypeOptions}
          onChange={(selectedOption) => handleInputChange('project_type', selectedOption)}
          value={formData.project_type}
        />
      </div>
      <div>
        <label>Project Status:</label>
        <Select
          options={projectStatusOptions}
          onChange={(selectedOption) => handleInputChange('project_status', selectedOption)}
          value={formData.project_status}
        />
      </div>
      <div>
        <label>Project Start Date:</label>
        <DatePicker
          selected={formData.project_start_date}
          onChange={(date) => handleInputChange('project_start_date', date)}
        />
      </div>
      <div>
        <label>Timeline Date:</label>
        <DatePicker
          selected={formData.timeline_date}
          onChange={(date) => handleInputChange('timeline_date', date)}
        />
      </div>
      <div>
        <label>Project End Date:</label>
        <DatePicker
          selected={formData.project_end_date}
          onChange={(date) => handleInputChange('project_end_date', date)}
        />
      </div>
      {/* Add more input fields as needed */}
      <div>
        <label>Project Budget:</label>
        <input
          type="text"
          value={formData.project_budget}
          onChange={(e) => handleInputChange('project_budget', e.target.value)}
        />
      </div>
      <div>
        <label>Project Location:</label>
        <input
          type="text"
          value={formData.project_location}
          onChange={(e) => handleInputChange('project_location', e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProjectForm;
