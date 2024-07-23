import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';

interface DropdownInput {
  id: number;
  page: number;
  x: number;
  y: number;
  value: string;
  options: string[];
  name: string;
}

const PdfEditor: React.FC = () => {
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [dropdownInputs, setDropdownInputs] = useState<DropdownInput[]>([]);
  const [isAddingDropdown, setIsAddingDropdown] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, CurrentScale } = zoomPluginInstance;
  const scrollModePluginInstance = scrollModePlugin();
  const { SwitchScrollModeButton } = scrollModePluginInstance;

  useEffect(() => {
    if (pdfData) {
      const url = URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }));
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [pdfData]);

  const loadPdf = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      setPdfData(new Uint8Array(arrayBuffer));
    }
  }, []);

  const handleViewerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isAddingDropdown && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / scale;
      const y = (event.clientY - rect.top) / scale;

      const pageNumber = 0; // Update this based on your page detection logic

      setDropdownInputs((prevInputs) => [
        ...prevInputs,
        {
          id: Date.now(),
          page: pageNumber,
          x,
          y,
          value: '',
          options: [
            'Bahuverma.pdf',
            'https://example.com/option2.pdf',
            'https://example.com/option3.pdf',
          ],
          name: 'drawing',
        }
      ]);
      setIsAddingDropdown(false);
    }
  };

  const handleDropdownChange = (id: number, value: string) => {
    setDropdownInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
    window.open(value, '_blank');
  };

  const saveTextToPdf = useCallback(async () => {
    if (pdfData) {
      const pdfDoc = await PDFDocument.load(pdfData);
      const pages = pdfDoc.getPages();
      dropdownInputs.forEach(({ page, x, y, value, name }) => {
        const pdfPage = pages[page];
        const { height } = pdfPage.getSize();
        pdfPage.drawText(`${name}: ${value}`, {
          x,
          y: height - y,
          size: 12,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      setPdfData(pdfBytes);
      setDropdownInputs([]);
    }
  }, [pdfData, dropdownInputs]);

  const handleZoomChange = useCallback((newScale: number) => {
    setScale(newScale);
  }, []);

  return (
    <div>
      <input type="file" onChange={loadPdf} />
      <button onClick={() => setIsAddingDropdown(true)}>Add Dropdown Input</button>
      <button onClick={saveTextToPdf}>Save Text to PDF</button>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <ZoomOutButton />
        <CurrentScale />
        <ZoomInButton />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
      
      </div>
      {fileUrl && (
        <div 
          ref={containerRef}
          onClick={handleViewerClick}
          style={{ position: 'relative', width: '100%', minHeight: '100vh' }}
        >
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
            <Viewer
              fileUrl={fileUrl}
              plugins={[defaultLayoutPluginInstance, zoomPluginInstance, scrollModePluginInstance]}
              onZoom={(zoom) => handleZoomChange(zoom.scale)}
              style={{ width: '100%', height: 'auto' }}
            />
          </Worker>
          {dropdownInputs.map(({ id, x, y, value, options, name }) => (
            <div
              key={id}
              style={{
                position: 'absolute',
                left: x * scale,
                top: y * scale,
                background: 'white',
                border: '1px solid black',
                transform: `scale(${scale})`,
                transformOrigin: 'top left'
              }}
            >
              <label htmlFor={`dropdown-${id}`}>{name}: </label>
              <select
                id={`dropdown-${id}`}
                value={value}
                onChange={(e) => handleDropdownChange(id, e.target.value)}
              >
                <option value="" disabled>Drawing</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PdfEditor;
