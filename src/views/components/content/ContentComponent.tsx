import React from 'react';

import { marked } from 'marked';

interface ContentComponentProps {
  html: string
}

const ContentComponent: React.FC<ContentComponentProps> = ({ html }) => {
  const content = marked(html).valueOf();
  return <>{html && html !== '' && <div className='card' dangerouslySetInnerHTML={{ __html: content }} />}</>;
}

export default ContentComponent;