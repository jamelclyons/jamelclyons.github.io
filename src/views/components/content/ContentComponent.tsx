import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/model/store';

import { getRepoFile } from '@/controllers/githubSlice';

import RepoContentQuery from '@/model/RepoContentQuery';

import { marked } from 'marked';

interface ContentComponentProps {
  html: string
}

const ContentComponent: React.FC<ContentComponentProps> = ({ html }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [content, setContent] = useState<string | object | null >(null);

  useEffect(() => {
    if (html !== '') {
      const fetchContent = async () => {
        try {
          const getContentObject = async (url: string) => {
            const pathname = new URL(url).pathname;
            const parts = pathname.split('/');
            const query = new RepoContentQuery(parts[1], parts[2], parts[4], parts[3]);
            return await dispatch(getRepoFile(query)).unwrap();
          };
  
          const contentObject = await getContentObject(html);
          const htmlContent = marked(contentObject).valueOf();

          setContent(htmlContent);
        } catch (error) {
          console.error("Error fetching content:", error);
        }
      };
  
      fetchContent();
    }
  }, [html, dispatch]);

  return <>{content && <div className='card content' dangerouslySetInnerHTML={{ __html: content }} />}</>;
}

export default ContentComponent;