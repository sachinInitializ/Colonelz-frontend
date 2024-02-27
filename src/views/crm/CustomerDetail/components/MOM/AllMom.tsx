import { Button, Card, Input } from '@/components/ui';
import React, { useEffect, useState } from 'react';
import { projectId } from './data';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const [momData, setMomData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [highlightedText, setHighlightedText] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSearchInput(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setHighlightedText(searchInput);
  };

  interface QueryParams {
    id: string;
    project_id: string;
    mom: string;
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Create an object to store and map the query parameters
  const allQueryParams: QueryParams = {
    id: queryParams.get('id') || '',
    project_id: queryParams.get('project_id') || '',
    mom: queryParams.get('type') || '',
  };

  useEffect(() => {
    fetch(`https://col-u3yp.onrender.com/v1/api/admin/getall/mom/?project_id=${allQueryParams.project_id}`)
      .then(response => response.json())
      .then(data => setMomData(data.data.mom_data))
      .catch(error => console.error('Error fetching data:', error));
  });

  const filteredMomData = momData.filter(item => {
    const searchIn = (str: string) =>
      str.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      searchIn(item.mom_id) ||
      searchIn(item.meetingdate) ||
      searchIn(item.source) ||
      (Array.isArray(item.attendees.client_name) && searchIn(item.attendees.client_name.join(', '))) || // Check if it's an array before joining
      searchIn(item.remark) ||
      searchIn(item.imaportant_note) || // Search important notes too
      Object.entries(item.attendees).some(([key, value]) => searchIn(value)) // Search all attendee attributes
    );
  });

  const highlightText = (text: string, isDate: boolean = false): JSX.Element => {
    if (!highlightedText.trim()) {
      return <>{text}</>;
    }
  
    const regex = new RegExp(`(${highlightedText})`, 'gi');
    const parts = text.split(regex);
  
    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="bg-yellow-200 bg-opacity-50 rounded-md">
              {isDate && regex.test(part) ? new Date(part).toLocaleDateString('en-GB') : part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };
  
  const getNames = (names: string[] | string) => {
    if (Array.isArray(names)) {
      return names.join(', ');
    } else if (typeof names === 'string') {
      return names;
    }
    return 'Invalid format';
  };
  return (
      <div className="">
          <div className="flex justify-between ">
              <h3>MOM Data</h3>
              <Input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  className=" w-1/5"
              />
          </div>
          <ul>
              {filteredMomData.map((item: any) => (
                  <div  key={item}>
                      <Card
                          header={
                              <div className="flex items-center justify-between">
                                  <span>
                                      Date:{' '}
                                      {
                                          new Date(item.meetingdate)
                                              .toISOString()
                                              .split('T')[0]
                                      }
                                  </span>
                                  <a
                                      href={`http://localhost:8000/v1/api/admin/generate/pdf?project_id=${projectId}&mom_id=${item.mom_id}`}
                                  >
                                      <Button size="sm" variant="solid">
                                          View MOM
                                      </Button>
                                  </a>
                              </div>
                          }
                          headerClass="font-semibold text-lg text-indigo-600"
                          bodyClass="text-center"
                      >
                          <div className=" text-left">
                              <h5>Attendees</h5>
                              <div className=" flex items-center gap-2">
                                  <h6>Client Name: </h6>
                                  <p>{getNames(item.attendees.client_name)}</p>
                              </div>
                              <div className=" flex items-center gap-2">
                                  <h6>Organised By: </h6>
                                  <p>{getNames(item.attendees.organisor)}</p>
                              </div>
                              <div className=" flex items-center gap-2">
                                  <h6>Designer: </h6>
                                  <p>{getNames(item.attendees.designer)}</p>
                              </div>
                              <div className=" flex items-center gap-2">
                                  <h6>Attendees: </h6>
                                  <p>{getNames(item.attendees.attendees)}</p>
                              </div>
                          </div>
                          <div className="my-4  text-left">
                              <h5 className="mt-2"> Remarks</h5>
                              <p>{item.remark}</p>
                          </div>
                          <div className="my-4  text-left">
                              <h5 className="mt-2"> Important Notes</h5>
                              <p>{item.imaportant_note}</p>
                          </div>
                          <div className="my-4 text-left grid grid-cols-8 gap-3">
                              {item.files.map((item) => (
                                  <a href={item} target="_blank">
                                      <Button variant="solid">File</Button>
                                  </a>
                              ))}
                          </div>
                      </Card>
                  </div>
              ))}
          </ul>
      </div>
  )
};

export default App;
