import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '/public/Images/health records.jpg'


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    textDecoration: 'underline',
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

// Meeting details
const meetingDetails = {
  date: "May 9, 2024",
  time: "10:00 AM",
  location: "Conference Room",
  attendees: [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
  ],
  agendaItems: [
    "Review previous meeting minutes",
    "Discuss project updates",
    "Plan upcoming tasks",
  ],
};

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>

        <Image src={logo} />
     
  <Text style={styles.heading}>Meeting Details</Text>
</View>

      
      {/* Meeting details */}
      <View style={styles.section}>
        <Text>Date: {meetingDetails.date}</Text>
        <Text>Location: {meetingDetails.location}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Attendees:</Text>
        <View>
          {meetingDetails.attendees.map((attendee, index) => (
            <Text key={index} style={styles.content}>
              - {attendee}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Agenda Items:</Text>
        <View>
          {meetingDetails.agendaItems.map((item, index) => (
            <Text key={index} style={styles.content}>
              {index + 1}. {item}
            </Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
