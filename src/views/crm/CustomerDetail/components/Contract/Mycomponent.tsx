import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Svg, Circle, Path, Defs, G, Image, Polygon } from '@react-pdf/renderer';




const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Courier',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    fontFamily: 'Courier',
  },
  section: {
    marginBottom: 10,
  },
  attendees: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attendee: {
    flexDirection: 'column',
  },
  remarks: {
    flexDirection: 'column',
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
    <View style={styles.header}>

    {/* <Image src={`./login-bg.jpg`} /> */}
</View>
      <View style={styles.header}>
        <Text>Minutes of Meeting</Text>
        <Text>At Site</Text>
      </View>
      <View style={styles.section}>
        <Text>22-05-2024</Text>
      </View>
      <View style={styles.section}>
        <Text>Attendees</Text>
        <View style={styles.attendees}>
          <View style={styles.attendee}>
            <Text>Client</Text>
            <Text>Arvind & Devashish Gupta</Text>
          </View>
          <View style={styles.attendee}>
            <Text>Organizer</Text>
            <Text>Harshit</Text>
          </View>
          <View style={styles.attendee}>
            <Text>Designer</Text>
            <Text>Vivek</Text>
          </View>
          <View style={styles.attendee}>
            <Text>Others</Text>
            <Text>Ratnesh</Text>
          </View>
        </View>
      </View>
      <View style={styles.remarks}>
        <Text>Remarks</Text>
        <Text>1. Soft serve machine will be placed over under counter ice cube machine.</Text>
        <Text>2. 3 Barrels and Electrical water boiler will be placed in centre of back wall.</Text>
             </View>
    </Page>
  </Document>
);

export default MyDocument;