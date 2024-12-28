import React, { useEffect } from 'react';

import User from '../model/User';

interface ResumeProps {
  user: User;
}

const Resume: React.FC<ResumeProps> = ({ user }) => {
  useEffect(() => {
    document.title = `Resume - ${user?.name}`;
  }, []);

  return (
    <section className="resume">
      <main>
        <iframe id="pdfViewer" src="../../Resume.pdf"></iframe>
      </main>
    </section>
  );
}

export default Resume;
