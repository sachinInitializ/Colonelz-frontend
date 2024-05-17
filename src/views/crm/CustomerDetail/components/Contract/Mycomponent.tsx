import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MyDocument from './MyDocument';

const PDFPreview = () => (
  <div>
    <PDFViewer width="100%" height="600">
      <MyDocument />
    </PDFViewer>
    <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
  </div>
);

export default PDFPreview;