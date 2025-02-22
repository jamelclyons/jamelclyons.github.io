import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/model/store';
import RepoContentQuery from '@/model/RepoContentQuery';

import { getRepoFile } from '@/controllers/githubSlice';

import { marked } from 'marked';

interface ContentComponentProps {
  title: string | null;
  url: string;
}

const ContentComponent: React.FC<ContentComponentProps> = ({ title, url }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [html, setHTML] = useState<string | object | null>(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;
    const controller = new AbortController();

    const fetchContent = async () => {
      try {
        const pathname = new URL(url).pathname;
        const parts = pathname.split('/');
        if (parts.length < 5) throw new Error('Invalid URL format');

        const query = new RepoContentQuery(parts[1], parts[2], parts[4], parts[3]);
        const contentObject = await dispatch(getRepoFile(query)).unwrap();

        if (isMounted) {
          const htmlContent = marked.parse(contentObject);
          setHTML(htmlContent);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();

    return () => {
      isMounted = false; // Prevent state updates if unmounted
      controller.abort(); // Cancel any ongoing requests
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