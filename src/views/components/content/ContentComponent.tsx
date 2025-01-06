import React from 'react';

interface ContentComponentProps {
  html: string
}

const ContentComponent: React.FC<ContentComponentProps> = ({ html }) => {
  return <>{html && html !== '' && <div className='card' dangerouslySetInnerHTML={{ __html: html }} />}</>;
}

export default ContentComponent;