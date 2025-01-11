import React, { useEffect } from 'react';

import User from '../model/User';

interface ResumeProps {
  user: User;
}

const Resume: React.FC<ResumeProps> = ({ user }) => {
  useEffect(() => {
    document.title = `Resume - ${user?.name}`;
  }, []);
console.log(user.resume)
  return (
    <section className="resume">
      <main>
        <iframe id="pdfViewer" src={user.resume}></iframe>
      </main>
    </section>
  );
}

export default Resume;
