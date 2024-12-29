import React from 'react';

interface ContentComponentProps {
  content: Array<string>
}

const ContentComponent: React.FC<ContentComponentProps> = ({ content }) => {

  return (
    <>
      {Array.isArray(content) &&
        content.map((element, index) => (
          <div key={index} className="content">
            {element}
          </div>
        ))}
    </>
  );
}

export default ContentComponent;