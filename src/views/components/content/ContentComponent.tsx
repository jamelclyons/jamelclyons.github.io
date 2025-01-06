import React from 'react';

interface ContentComponentProps {
  html: string | object
}

const ContentComponent: React.FC<ContentComponentProps> = ({ html }) => {
  return <div className='card' dangerouslySetInnerHTML={{ __html: html }} />;
}

export default ContentComponent;