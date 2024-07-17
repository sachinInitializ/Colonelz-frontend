import React, { useState, useEffect, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Document, Page, pdfjs } from 'react-pdf';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfFormCreator: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
  const [fields, setFields] = useState<any[]>([]);
  const [originalPdfData, setOriginalPdfData] = useState<ArrayBuffer | null>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [showText, setShowText] = useState<boolean>(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPdf = async () => {
      if (pdfFile) {
        try {
          const existingPdfBytes = await pdfFile.arrayBuffer();
          const loadedPdfDoc = await PDFDocument.load(existingPdfBytes);
          setPdfDoc(loadedPdfDoc);
          setOriginalPdfData(existingPdfBytes);
          const pdfUrl = URL.createObjectURL(new Blob([existingPdfBytes], { type: 'application/pdf' }));
          setPdfDataUrl(pdfUrl);
        } catch (error) {
          console.error('Error loading PDF:', error);
          alert('Error loading PDF. Please try again.');
        }
      }
    };

    loadPdf();
  }, [pdfFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const addFieldToPDF = async () => {
    if (!pdfDoc) return;

    const form = pdfDoc.getForm();
    const page = pdfDoc.getPage(0); // Assuming a single-page PDF for simplicity

    fields.forEach((field) => {
      const [x, y] = [field.left, page.getHeight() - field.top - field.height];
      if (field.type === 'text') {
        const textField = form.createTextField(field.name);
        textField.setText(field.defaultValue || '');
        textField.addToPage(page, { x, y, width: field.width, height: field.height });
      } else if (field.type === 'dropdown') {
        const dropdownField = form.createDropdown(field.name);
        dropdownField.addOptions(field.options || []);
        dropdownField.select(field.defaultValue || '');
        dropdownField.addToPage(page, { x, y, width: field.width, height: field.height });
      } else if (field.type === 'checkbox') {
        const checkBox = form.createCheckBox(field.name);
        if (field.checked) checkBox.check();
        checkBox.addToPage(page, { x, y, width: field.width, height: field.height });
      } else if (field.type === 'radio') {
        const radioGroup = form.createRadioGroup(field.name);
        field.options.forEach((option: string, index: number) => {
          radioGroup.addOptionToPage(option, page, { x: x + index * 50, y });
        });
        radioGroup.select(field.defaultValue || field.options[0]);
      } else if (field.type === 'optionList') {
        const optionList = form.createOptionList(field.name);
        optionList.addOptions(field.options || []);
        optionList.select(field.defaultValue || '');
        optionList.addToPage(page, { x, y, width: field.width, height: field.height });
      }
    });

    const updatedBytes = await pdfDoc.save();
    const updatedPdfBlob = new Blob([updatedBytes], { type: 'application/pdf' });
    const updatedPdfSrc = URL.createObjectURL(updatedPdfBlob);
    setPdfDataUrl(updatedPdfSrc);
  };

  const handleDownload = async () => {
    await addFieldToPDF();
    if (pdfDoc) {
      const updatedBytes = await pdfDoc.save();
      const updatedPdfBlob = new Blob([updatedBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(updatedPdfBlob);
      link.download = 'updated_pdf.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleAddField = (type: string) => {
    const uniqueName = `${type}_${fields.length}_${new Date().getTime()}`;
    setFields([
      ...fields,
      {
        type,
        name: uniqueName,
        left: 50,
        top: 50,
        width: type === 'dropdown' ? 150 : 100,
        height: 20,
        options: ['Option 1', 'Option 2', 'Option 3'],
        defaultValue: '',
        checked: false,
      },
    ]);
  };

  const handleDrag: DraggableEventHandler = (e, data) => {
    const index = parseInt(data.node.getAttribute('data-index')!, 10);
    const newFields = [...fields];
    newFields[index] = {
      ...newFields[index],
      left: data.x,
      top: data.y,
    };
    setFields(newFields);
  };

  const handleResize = (index: number, e: any, data: any) => {
    const newFields = [...fields];
    newFields[index] = {
      ...newFields[index],
      width: data.size.width,
      height: data.size.height,
    };
    setFields(newFields);
  };

  const handleZoomIn = () => setZoom(zoom + 0.2);
  const handleZoomOut = () => setZoom(zoom - 0.2);

  const handleToggleText = () => setShowText(!showText);

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {pdfDataUrl && (
        <div>
          <h2>PDF Uploaded:</h2>
          <div
            ref={pdfContainerRef}
            style={{
              position: 'relative',
              width: `${800 * zoom}px`,
              height: `${600 * zoom}px`,
              border: '1px solid black',
              overflow: 'auto',
            }}
          >
            <Document
              file={pdfDataUrl}
              onLoadSuccess={() => {
                // Update coordinates if needed
              }}
            >
              <Page pageNumber={1} width={800 * zoom} />
            </Document>
            {fields.map((field, index) => (
              <Draggable
                key={index}
                position={{ x: field.left * zoom, y: field.top * zoom }}
                onStop={handleDrag}
                nodeRef={pdfContainerRef}
              >
                <ResizableBox
                  width={field.width * zoom}
                  height={field.height * zoom}
                  minConstraints={[50 * zoom, 20 * zoom]}
                  maxConstraints={[400 * zoom, 100 * zoom]}
                  onResizeStop={(e, data) => handleResize(index, e, data)}
                  resizeHandles={['se']}
                  data-index={index.toString()}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(255, 255, 0, 0.5)',
                      border: '1px solid black',
                      textAlign: 'center',
                      lineHeight: `${field.height * zoom}px`,
                      cursor: 'move',
                    }}
                  >
                    {field.type.charAt(0).toUpperCase() + field.type.slice(1)} {index + 1}
                  </div>
                </ResizableBox>
              </Draggable>
            ))}
          </div>
          <button onClick={() => handleAddField('text')}>Add Text Field</button>
          <button onClick={() => handleAddField('checkbox')}>Add Checkbox</button>
          <button onClick={() => handleAddField('radio')}>Add Radio Group</button>
          <button onClick={() => handleAddField('dropdown')}>Add Dropdown</button>
          <button onClick={() => handleAddField('optionList')}>Add Option List</button>
          <button onClick={handleDownload}>Download PDF</button>
          <button onClick={handleZoomIn}>Zoom In</button>
          <button onClick={handleZoomOut}>Zoom Out</button>
          <button onClick={handleToggleText}>
            {showText ? 'Hide Text' : 'Show Text'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfFormCreator;
