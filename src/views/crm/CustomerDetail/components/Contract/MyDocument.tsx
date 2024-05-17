import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  image: {
    margin: 10,
    width:400,
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Hello World</Text>
        <Image style={styles.image} src={'/Images/logo.png'} />
      </View>
      <View style={styles.section}>
        <Text>We're inside a PDF!</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;