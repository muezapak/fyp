// DocumentPreview.js
import React from 'react';
import { Document, Page } from '@react-pdf/renderer';

// const DocumentPreview = ({ documentUrl }) => {
//   return (
//     <div>
//       <Document file={documentUrl}>
//         <Page pageNumber={1} />
//       </Document>
//     </div>
//   );
// };

// 

const DocumentPreview = ({ documentUrl }) => {
    return (
      <div>
        {/* Your logic to display the document preview */}
        <iframe src={documentUrl} title="Document Preview" width="100%" height="500px" />
        {/* Adjust the properties and logic based on your document preview requirements */}
      </div>
    );
  };
  export default DocumentPreview;