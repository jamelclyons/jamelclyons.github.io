import React, { useEffect, useState } from 'react';

import { getRepoFile } from '@/controllers/githubSlice';

import ContentURL from '@/model/ContentURL';
import RepoContentQuery from '@/model/RepoContentQuery';

import { marked } from 'marked';

interface ContentComponentProps {
  title: string | null;
  content: ContentURL;
}

const ContentComponent: React.FC<ContentComponentProps> = ({ title, content }) => {
  const [query, setQuery] = useState<RepoContentQuery | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [html, setHTML] = useState<string | object | null>(null);

  useEffect(() => {
    if (content) {
      setQuery(content.toRepoContentQuery())
    }
  }, [content]);

  useEffect(() => {
    let isMounted = true;

    if (query) {
      getRepoFile(query).then((file) => setFile(file));
    }

    return () => {
      isMounted = false;
    };
  }, [query]);

  useEffect(() => {
    if (file) {
      setHTML(marked.parse(file));
    }
  }, [file]);

  return (
    <>
      {html && html != "" && (
        <div className='content'>
          {title && <h4 className='title'>{title}</h4>}
          <div className='content-html' dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      )}
    </>
  );
};

export default ContentComponent;