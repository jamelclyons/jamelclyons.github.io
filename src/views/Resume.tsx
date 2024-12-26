import { useEffect } from 'react';

function Resume() {
  useEffect(() => {
    document.title = `Resume - Jamel C. Lyons`;
  }, []);

  return (
    <section className="resume">
      <main>
        <iframe id="pdfViewer" src="../../Resume.pdf" frameborder="0"></iframe>
      </main>
    </section>
  );
}

export default Resume;
