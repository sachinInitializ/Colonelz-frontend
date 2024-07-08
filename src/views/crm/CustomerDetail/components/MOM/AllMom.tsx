import { Button, Card, Dropdown, Input } from '@/components/ui';
import React, { useContext, useEffect, useState } from 'react';
import { MomData, projectId } from './data';
import { useLocation } from 'react-router-dom';
import { apiGetCrmProjectsMom } from '@/services/CrmService';
import { useMomContext } from '../../store/MomContext';
import { BsThreeDotsVertical } from 'react-icons/bs';


import { Document, Page, Text, View, Image, BlobProvider, StyleSheet, Font, Link } from '@react-pdf/renderer';
Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/VIeViZ2fPtYBt3B2fQZplvesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: 300,
      
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/hlvAxH6aIdOjWlLzgm0jqg.ttf",
      fontWeight: 400
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/4WGKlFyjcmCFVl8pRsgZ9vesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: 500,
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/-zOABrCWORC3lyDh-ajNnPesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: 600,
    }
    ,
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/8JitanEsk5aDh7mDYs-fYfesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: 700,
    }
  ]
});


const styles = StyleSheet.create({
  page: {
    fontFamily:"Times-Roman",
    paddingBottom:10,
    paddingTop:20,
  },
  text: {
    fontWeight:300,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Poppins',
    color:"gray",
    textTransform: 'capitalize',
    width:10,
  },
  header:{
  height: 130,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  },

  headerText:{
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: 700,
  },

  subsection:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:50,
    paddingRight:50,
  },
  section: {
    marginBottom: 10,
    fontFamily: 'Poppins',
    fontWeight: 400,
   
  },
  section1: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 14,

  },
  heading: {
    fontSize: 25,
    marginBottom: 20,
    fontFamily: 'Poppins',
    fontWeight: 500,
    textAlign: 'center',
    marginTop:20,

  },
  subheading: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 18,
    marginBottom: 10,
   paddingLeft:50,
   marginTop:10,
  },
  subheading1: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 18,
    marginBottom: 10,
  marginTop:10,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins',
    fontWeight: 400,
  },

  attendees: {
    marginBottom: 10,
  },
  attendeeSection1: {
    paddingLeft: 50,
    paddingRight: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  attendeeSection: {
    marginBottom: 10,
    width:230
    
  },
  attendeeHeading: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 5,
  },
  attendeeName: {
    fontSize: 12,
    marginBottom: 3,
  },
  image: {
    margin: 10,
    width: 90,
    height: 60,
  },
  remarks:{
    fontFamily: 'Poppins',
    fontWeight: 400,
    paddingLeft:50,
    paddingRight:50,
    color:"gray",
    fontSize:12
  }
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  const year = date.getUTCFullYear()

  return `${day}-${month}-${year}`
}

const MyDocument = (rowData:any) => (
  <Document>
  <Page style={styles.page}>
    <View style={styles.header}>
    <Image style={styles.image} src={'/Images/logo.png'} />
      <Text style={styles.headerText}>Devs Project</Text>
    </View>
      
    
    <View style={styles.section}>
      <Text style={styles.heading}>Meeting Details</Text>
    </View>
    <View style={styles.subsection}>
      <View>
    <View style={styles.section1}>
     <Text style={styles.subtext}>Location:<Text style={styles.text}> {rowData.data.location}</Text></Text>   
    </View>

    <Text style={styles.subheading1}>Attendees</Text>
    <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Client: <Text style={styles.text}>{rowData.data.attendees?.client_name}</Text></Text>
         
        </View>

        <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Organizer:<Text style={styles.text}>{rowData.data.attendees?.organisor}</Text></Text>
          
        </View>

       

       

        </View>

    <View>
    <View style={styles.section1}>
    <Text style={styles.subtext}>Date: <Text style={styles.text}>{formatDate(rowData.data.meetingdate)}</Text></Text> 
    </View>
    <Text style={styles.subheading}> </Text>
    <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Designer:  <Text style={styles.text}>{rowData.data.attendees?.designer}</Text></Text>
        
      
        </View>

    <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Others:<Text style={styles.text}>{rowData.data.attendees?.attendees}</Text></Text>
          
        </View>

        </View>

    </View>
   
    <View style={styles.section}>
      <Text style={styles.subheading}>Remarks</Text>
      <Text style={styles.remarks}>
        {rowData.data.remark?rowData.data.remark:"-"}
      </Text>
    </View>
    <View style={styles.section}>
    <Text style={styles.subheading}>Files</Text>
    <View style={styles.attendees}>
      <View style={styles.attendeeSection1}>
      <View style={styles.attendeeSection}>
        {rowData.data.files.length > 0 ? (
          rowData.data.files.map((file:any) => (
              <Text style={styles.attendeeHeading}>File: <Text style={styles.text}><Link src={file.fileUrl}>{file.fileName}</Link></Text></Text>
          ))
          ) : (
          <Text>No files</Text>
          )}
       
      </View>
      </View>
      </View>
    </View>
  </Page>
</Document>
);

interface Attendees {
  client_name: string[];
  [key: string]: string | string[];
}

interface LeadDataItem {
  mom_id: string;
  meetingdate: string;
  location: string;
  attendees: Attendees;
  remark: string;
  important_note: string;
}

interface File {
  fileUrl: string;
  fileName:string
  
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [highlightedText, setHighlightedText] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const { leadData, client } = useMomContext();

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
  type Files={
      fileUrl: string;
    }
  

  const location = useLocation();
  const [data,setdata]=useState()
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('project_id');
    if (projectId) {
      const fetchData = async () => {
        try {
          const response = await apiGetCrmProjectsMom(projectId);
          const data = response;
          setdata(data.data.mom_data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [location.search]);

  

  const filteredMomData = data
  ? data.filter((item) => {
      const searchIn = (str: string | unknown): boolean => {
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
    })
  : [];


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
  

  
  
  const getNames = (names: string[] | string) => {
    if (Array.isArray(names)) {
      return names.join(', ');
    } else if (typeof names === 'string') {
      return names;
    }
    return 'Invalid format';
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
    const year = date.getUTCFullYear()

    return `${day}-${month}-${year}`
}



const Toggle= <BsThreeDotsVertical className='font-semibold text-xl cursor-pointer'/>
  return (
    <div className="">
      <div className="flex justify-between ">
        <h3>MOM Data</h3>
        <Input
          type="text"
          placeholder="Search..."
          value={searchInput}
          className=" w-1/5"
          size='sm'
          onChange={handleSearchInputChange}
        />
       

      </div>
      <div>
      {filteredMomData.length > 0 ? (
    filteredMomData.map((rowData: any) => (
      <Card className='my-6'>
      <main className="pb-10 ">
      <div className=" dark:bg-gray-950 rounded-lg p-6">
        <div className="space-y-4">
        <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-bold">Meeting Details</h2>
              <BlobProvider document={<MyDocument data={rowData} />}>
        {({ blob, url, loading, error }) => {
            if (loading) {
            return <BsThreeDotsVertical className='font-semibold text-xl cursor-pointer'/>;
            }
            if (error) {
            console.error(error);
            return `Error: ${error.message}`;
            }
        
            return (
            <div>
                <span>
              <Dropdown renderTitle={Toggle} placement='bottom-end'>
              <a href={url || ""} target='_blank' rel='noreferrer'    
                    >  
                <Dropdown.Item eventKey="a" >View MOM</Dropdown.Item></a>
               
            </Dropdown></span>
            </div>
            );
        }}
        </BlobProvider>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className='flex gap-1 items-center'>
                <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">Location: </p>
                <p className=' text-base'>{highlightText(getNames(rowData.location))}</p>
                </div>
                <div className='flex gap-1 items-center'>
                <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">Date: </p>
                <p className=' text-base'>{highlightText(formatDate(rowData.meetingdate))}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-semibold text-xl">Attendees</p>
                <ul className="space-y-1">
                  <li className=' text-base'><span className='font-semibold text-lg'>Client:</span> {highlightText(rowData.attendees.client_name?rowData.attendees.client_name:"-")} </li>
                  <li className=' text-base'><span className='font-semibold text-lg'>Organizer:</span> {highlightText(rowData.attendees.organisor?rowData.attendees.organisor:"-")} </li>
                  <li className=' text-base'><span className='font-semibold text-lg'>Designer:</span> {highlightText(rowData.attendees.designer?rowData.attendees.designer:"-")} </li>
                  <li className=' text-base'><span className='font-semibold text-lg'>Others:</span> {highlightText(rowData.attendees.attendees?rowData.attendees.attendees:"-")} </li>
                </ul>
              </div>
            </div>
            <div className='mb-6'>
              <p className="text-gray-500 dark:text-gray-400 font-semibold text-xl ">Remarks</p>
              <p>
                {highlightText(rowData.remark?rowData.remark:"-")}
              </p>
            </div>
          <div>
          <p className="text-gray-500 dark:text-gray-400 font-semibold text-xl">Files</p>
            <div className="space-y-2">
              
            {rowData.files.length > 0 ? (
  rowData.files.map((file: File) => (
    <a className="flex items-center gap-2 text-blue-600 hover:underline" href={file.fileUrl} target='_blank'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
      {highlightText(getNames(file.fileName.length > 20 ? `${file.fileName.substring(0, 20)}...` : file.fileName))}
    </a>
  ))
) : (
  <p>No files</p>
)}
           
            </div>
          </div>
        </div>
      </div>
    </main>
    </Card>
        ))) : (
          <div style={{ textAlign: 'center' }}>No Mom Data</div>
      )}
      </div>
    </div>
  );
};

export default App;