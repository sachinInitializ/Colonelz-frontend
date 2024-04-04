import { Button, Card, Input } from '@/components/ui';
import React, { useEffect, useState } from 'react';
import { MomData, projectId } from './data';
import { useLocation } from 'react-router-dom';
import { apiGetCrmProjectsMom } from '@/services/CrmService';

const App: React.FC = () => {
  const [momData, setMomData] = useState<MomData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [highlightedText, setHighlightedText] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setSearchInput(term);
    setHighlightedText(term); 
  };
  

  const handleSearchButtonClick = () => {
    setHighlightedText(searchTerm);
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
    const fetchData = async () => {
      try {
        const response = await apiGetCrmProjectsMom(allQueryParams.project_id);
        setMomData(response.data.mom_data);
        console.log('Received response from server:', );
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  
  }, [allQueryParams.project_id]);
  console.log(momData);
  

  const filteredMomData = momData.filter((item) => {
    const searchIn = (str: string | undefined): boolean => {
      if (str === undefined) {
        return false;
      }
      return str.toLowerCase().includes(searchTerm.toLowerCase());
    };
    
    return (
      searchIn(item.mom_id) ||
      searchIn(item.meetingdate) ||
      searchIn(item.location) ||
      (Array.isArray(item.attendees.client_name) && searchIn(item.attendees.client_name.join(', '))) ||
      searchIn(item.remark) ||
      searchIn(item.imaportant_note) ||
      (item.attendees && Object.entries(item.attendees).some(([key, value]) => searchIn(value)))
    );
  });


  const highlightText = (text: string, isDate: boolean = false): JSX.Element => {
    if (!highlightedText.trim()) {
      return <>{text}</>;
    }
  
    const regex = new RegExp(`(${highlightedText})`, 'gi');
    const parts = text ? text.split(regex) : [];
  
    return (
        <>
            {parts.map((part, index) =>
                regex.test(part) ? (
                    <span
                        key={index}
                        className=" bg-[#FFFF00] bg-opacity-100 text-black rounded-md"
                    >
                        {isDate && regex.test(part) && text
                            ? new Date(part).toISOString().split('T')[0]
                            : part}
                    </span>
                ) : (
                    <span key={index}>{part}</span>
                ),
            )}
        </>
    )
  };
  
  


  useEffect(() => {
    console.log('searchTerm:', searchTerm);
    console.log('highlightedText:', highlightedText);
    console.log('filteredMomData:', filteredMomData);
    // ... rest of the code
  }, [searchTerm, highlightedText, filteredMomData]);
  
  
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
          className=" w-1/5"
          onChange={handleSearchInputChange}
        />
       

      </div>
      <ul>
        {filteredMomData.map((item: any) => (
          <div key={item}>
            <Card
              header={
                <div className="flex items-center justify-between">
                  <span>
                    Date:{' '}
                    {new Date(item.meetingdate)
                      .toISOString()
                      .split('T')[0]}
                  </span>
                  <a
                    href={`http://localhost:8000/v1/api/admin/generate/pdf?project_id=${projectId}&mom_id=${item.mom_id}`} target='_blank'
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
                  <p>{highlightText(getNames(item.attendees.client_name))}</p>
                </div>
                <div className=" flex items-center gap-2">
                  <h6>Organised By: </h6>
                  <p>{highlightText(getNames(item.attendees.organisor))}</p>
                </div>
                <div className=" flex items-center gap-2">
                  <h6>Designer: </h6>
                  <p>{highlightText(getNames(item.attendees.designer))}</p>
                </div>
                <div className=" flex items-center gap-2">
                  <h6>Attendees: </h6>
                  <p>{highlightText(getNames(item.attendees.attendees))}</p>
                </div>
              </div>
              <div className="my-4  text-left">
                <h5 className="mt-2"> Remarks</h5>
                <p>{highlightText(item.remark)}</p>
              </div>
              <div className="my-4  text-left">
                <h5 className="mt-2"> Important Notes</h5>
                <p>{highlightText(item.imaportant_note)}</p>
              </div>
              <div className="my-4 text-left grid grid-cols-8 gap-3">
                {item.files.map((item) => (
                  <a href={item.fileUrl} target="_blank">
                    <Button variant="solid">File</Button>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;