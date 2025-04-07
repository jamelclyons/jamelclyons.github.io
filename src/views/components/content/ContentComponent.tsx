import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { marked } from 'marked';

import { getRepoFile } from '@/controllers/githubSlice';

import type { AppDispatch } from '@/model/store';
import ContentURL from '@/model/ContentURL';

interface ContentComponentProps {
  title: string | null;
  content: ContentURL;
}

const ContentComponent: React.FC<ContentComponentProps> = ({ title, content }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [html, setHTML] = useState<string | object | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchContent = async () => {
      try {
        const query = content.toRepoContentQuery();

        if (query) {
          const contentObject = await dispatch(getRepoFile(query)).unwrap();

          if (isMounted) {
            const htmlContent = marked.parse(contentObject);
            setHTML(htmlContent);
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [content]);

  return (
    <>
      {html && (
        <div className='content'>
          {title && <h4 className='title'>{title}</h4>}
          <div className='content-html' dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      )}
    </>
  );
};

export default ContentComponent;