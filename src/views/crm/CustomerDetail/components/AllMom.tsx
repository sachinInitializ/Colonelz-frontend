import { Button, Card, Dropdown } from '@/components/ui';
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
    const [momData, setMomData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetch('https://col-u3yp.onrender.com/v1/api/admin/getall/mom/?project_id=COLP-266329')
            .then(response => response.json())
            .then(data => setMomData(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredMomData = momData.filter(item => {
        const searchIn = (str: string) => str.toLowerCase().includes(searchTerm.toLowerCase());

        return (
            searchIn(item.mom_id) ||
            searchIn(item.meetingdate) ||
            searchIn(item.source) ||
            (item.attendees.client_name && searchIn(item.attendees.client_name.join(', '))) ||
            searchIn(item.remark)
        );
    });

    const getNames = (names: string[] | string) => {
        if (Array.isArray(names)) {
            return names.join(', ');
        } else if (typeof names === 'string') {
            return names;
        }
        return 'Invalid format';
    };

    const Toggle = <Button>Files</Button>

    return (
        <div>
            <h3>MOM Data</h3>
          
            <ul>
            {filteredMomData.map((item: any) => (
    <div className='my-4'>
    <Card
        header={<span>Date: {item.meetingdate}</span>}
        headerClass="font-semibold text-lg text-indigo-600"
        bodyClass="text-center"
      
    >
        <div className=' text-left'>
        <h5 >Attendees</h5>
        <div className=' flex items-center gap-2'>
        <h6>Client Name: </h6>
        <p>{getNames(item.attendees.client_name)}</p>
        </div>
        <div className=' flex items-center gap-2'>
        <h6>Organisor: </h6>
        <p>{getNames(item.attendees.organisor)}</p>
        </div>
        <div className=' flex items-center gap-2'>
        <h6>Architect: </h6>
        <p>{getNames(item.attendees.architect)}</p>
        </div>
        <div className=' flex items-center gap-2'>
        <h6>Consultant: </h6>
        <p>{getNames(item.attendees.consultant_name)}</p>
        </div>
        </div>
         <div className='my-4  text-left'>
          <h5 className='mt-2'> Remarks</h5>
          <p>{item.remark}</p>
         </div>
         <div className='my-4  text-left'>
          <h5 className='mt-2'> Important Notes</h5>
          <p>{item.imaportant_note}</p>
         </div>
         <div className='my-4 text-left'>
         <Dropdown  renderTitle={Toggle}  >
                {item.files.map((item) => (
                    <Dropdown.Item
                        key={item.key}
                        eventKey={item.key}
                      
                    >
                        {item.name}
                    </Dropdown.Item>
                ))}
            </Dropdown>
         </div>
    </Card>
</div>
))}

            </ul>
        </div>
    );
};

export default App;
