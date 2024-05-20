import { Document, Page, Text, View, Image, BlobProvider, StyleSheet, Font } from '@react-pdf/renderer';
import { sub } from 'date-fns';
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  fontWeight: 800,

});


const styles = StyleSheet.create({
  page: {
    fontFamily:"Times-Roman",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Times-Roman'
  },
  header:{
  height: 150,
  backgroundColor:"#cdd2d2",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  },

  headerText:{
    fontSize: 24,
    fontFamily: 'Oswald',
  },

  subsection:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  section: {
    marginBottom: 10,

  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:20,

  },
  subheading: {
    fontSize: 18,
    marginBottom: 10,
  },
  subtext: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
  },

  attendees: {
    marginBottom: 10,
  },
  attendeeSection: {
    marginBottom: 10,
  },
  attendeeHeading: {
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
});

const MyDocument = () => (
  <Document>
  <Page style={styles.page}>
    <View style={styles.header}>
    <Image style={styles.image} src={'/public/Images/logo.png'} />
      <Text style={styles.headerText}>Devs Project</Text>
    </View>
      
    
    <View style={styles.section}>
      <Text style={styles.heading}>Meeting Details</Text>
    </View>
    <View style={styles.subsection}>
    <View style={styles.section}>
      <Text style={styles.text}> <Text style={styles.subtext}>Location:</Text> At Client Place</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.text}>Date: 01-03-2024</Text>
    </View>
    </View>
    <View style={styles.section}>
      <Text style={styles.subheading}>Attendees</Text>
      <View style={styles.attendees}>
        <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Client:</Text>
          <Text style={styles.attendeeName}>Ratnesh Maurya</Text>
          <Text style={styles.attendeeName}>Hello</Text>
        </View>
        <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Organizer:</Text>
          <Text style={styles.attendeeName}>Abhishek Singh</Text>
        </View>
        <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Designer:</Text>
          <Text style={styles.attendeeName}>Ravi Singh</Text>
          <Text style={styles.attendeeName}>Mavi</Text>
        </View>
        <View style={styles.attendeeSection}>
          <Text style={styles.attendeeHeading}>Others:</Text>
          <Text style={styles.attendeeName}>Abhi Singh</Text>
        </View>
      </View>
    </View>
    <View style={styles.section}>
      <Text style={styles.subheading}>Remarks</Text>
      <Text style={styles.text}>
        This code snippet is configuring CORS (Cross-Origin Resource Sharing) for an Express.js application using the cors middleware. It allows requests from specified origins and defines the allowed methods.
      </Text>
    </View>
    <View style={styles.section}>
     
    </View>
  </Page>
</Document>
);

const MyComponent = () => {
  const handlePost=async(blob:any)=>{
      const formData = new FormData();
      formData.append('project_id', "COLP-946832");
      formData.append('folder_name', "review");
      formData.append('files', blob, 'myDocument.pdf');

     const response=await fetch('http://localhost:8000/v1/api/admin/project/fileupload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth')}`,
      },
      body: formData,
    });
    const result = await response.json();
    console.log(result);
  }
  return(
  <div>
    <BlobProvider document={<MyDocument />}>
      {({ blob, url, loading, error }) => {
        if (loading) {
          return 'Loading document...';
        }
        if (error) {
          console.error(error);
          return `Error: ${error.message}`;
        }
       
        return (
          <div>
            <button onClick={()=>{handlePost(blob)}}>send</button>
            <a href={url} target="_blank" rel="noopener noreferrer">View PDF</a>
            <a href={url} download="myDocument.pdf">Download PDF</a>
          </div>
        );
      }}
    </BlobProvider>
  </div>
)};

export default MyComponent;