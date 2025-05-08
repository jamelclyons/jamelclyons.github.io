import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { marked } from 'marked';

import { getRepoFile } from '@/controllers/githubSlice';

import type { AppDispatch, RootState } from '@/model/store';
import ContentURL from '@/model/ContentURL';
import RepoContentQuery from '@/model/RepoContentQuery';

interface ContentComponentProps {
  title: string | null;
  content: ContentURL;
}

const ContentComponent: React.FC<ContentComponentProps> = ({ title, content }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [query, setQuery] = useState<RepoContentQuery | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [html, setHTML] = useState<string | object | null>(null);

  useEffect(() => {
    if (content) {
      setQuery(content.toRepoContentQuery())
    }
  }, [content]);

  // useEffect(() => {
  //   let isMounted = true;
  
  //   if (query && !file) {
  //     const fetchContent = async () => {
  //       try {
  //         const response = await dispatch(getRepoFile(query)).unwrap();
  //         if (response && isMounted) {
  //           setFile(response);
  //         }
  //       } catch (error) {
  //         console.error('Failed to fetch repo file:', error);
  //       }
  //     };
  
  //     fetchContent();
  //   }
  
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [query]);

  useEffect(() => {
    if (file) {
      setHTML(marked.parse(file));
    }
  }, [file]);

  console.log(file)
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