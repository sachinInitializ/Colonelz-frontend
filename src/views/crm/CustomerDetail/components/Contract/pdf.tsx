
import { BlobProvider } from '@react-pdf/renderer';
import MyDocument from './Mycomponent';

const App = () => (
  <BlobProvider document={<MyDocument />}>
    {({ url, loading, error }) => {
      if (loading) {
        return <div>Loading...</div>;
      }
      if (error) {
        return <div>Error: {error.message}</div>;
      }
      if (!url) {
        return <div>PDF not generated</div>;
      }
      return (
        <div>
          <object data={url} type="application/pdf" width="100%" height="800">
            <p>Your browser does not support PDFs. Please download the PDF to view it.</p>
          </object>
          <a href={url} target="_blank" rel="noopener noreferrer">
  Open PDF
</a> 
          <div>
            <a href={url} download="meeting_minutes.pdf">
              Download PDF
            </a>
          </div>
        </div>
      );
    }}
  </BlobProvider>
);

export default App;
