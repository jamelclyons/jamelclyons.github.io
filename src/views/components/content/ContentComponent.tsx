import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/model/store';

import { getRepoFile } from '@/controllers/githubSlice';

import { marked } from 'marked';
import ContentURL from '@/model/ContentURL';

interface ContentComponentProps {
  title: string | null;
  content: ContentURL;
}

const ContentComponent: React.FC<ContentComponentProps> = ({ title, content }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [html, setHTML] = useState<string | object | null>(null);
  const [url, setURL] = useState<string>();

  useEffect(() => {
    if (content.url) {
      setURL(content.url)
    }
  }, [content, setURL]);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;
    const controller = new AbortController();

    const fetchContent = async () => {
      try {
        const query = new ContentURL(url).toRepoContentQuery();

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
  }, [url, dispatch]);

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