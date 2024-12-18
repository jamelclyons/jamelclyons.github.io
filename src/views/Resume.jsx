import React from 'react';

function Resume() {
  return (
    <main className='resume'>
      <iframe
        id="pdfViewer"
        src="../../Resume.pdf"
        frameborder="0"></iframe>
    </main>
  );
}

export default Resume;
