import React, { useEffect, useState } from 'react';

import User from '@/model/User';
import DocumentURL from '@/model/DocumentURL';

import DocumentComponent from '@/views/components/DocumentComponent';

interface ResumeProps {
  user: User;
}

const Resume: React.FC<ResumeProps> = ({ user }) => {

  const [resume, setResume] = useState<DocumentURL>(new DocumentURL(user.resume));

  useEffect(() => {
    document.title = `Resume - ${user.name}`
  }, []);

  useEffect(() => {
    setResume(new DocumentURL(user.resume))
  }, [user, setResume]);

  return (
    <section className="resume">
      <DocumentComponent documentURL={resume} />
    </section>
  );
}

export default Resume;
