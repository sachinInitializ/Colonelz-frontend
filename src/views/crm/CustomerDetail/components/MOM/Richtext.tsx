import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor: React.FC = () => {
  const [value, setValue] = useState('');

  const handleChange = (content: string) => {
    setValue(content);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align',
    'script'
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill 
        value={value} 
        onChange={handleChange} 
        modules={modules}
        formats={formats}
        theme="snow"
      />
    </div>
  );
};

export default RichTextEditor;