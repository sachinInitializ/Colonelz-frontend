import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
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
      <View style={styles.section}>
        <Text style={styles.heading}>Meeting Minutes</Text>
        <Text style={styles.content}>Date: {meetingDetails.date}</Text>
        <Text style={styles.content}>Time: {meetingDetails.time}</Text>
        <Text style={styles.content}>Location: {meetingDetails.location}</Text>
        <Text style={styles.heading}>Attendees:</Text>
        {meetingDetails.attendees.map((attendee, index) => (
          <Text key={index} style={styles.content}>
            - {attendee}
          </Text>
        ))}
        <Text style={styles.heading}>Agenda Items:</Text>
        {meetingDetails.agendaItems.map((item, index) => (
          <Text key={index} style={styles.content}>
            {index + 1}. {item}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
