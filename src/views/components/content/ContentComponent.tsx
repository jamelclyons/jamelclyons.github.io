import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/model/store';

import { getRepoFile } from '@/controllers/githubSlice';

import RepoContentQuery from '@/model/RepoContentQuery';

import { marked } from 'marked';

interface ContentComponentProps {
  title: string | null;
  url: string
}

const ContentComponent: React.FC<ContentComponentProps> = ({ title, url }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [html, setHTML] = useState<string | object | null>(null);

  useEffect(() => {
    if (url !== '') {
      console.log(url)
      const fetchContent = async () => {
        try {
          const getContentObject = async (url: string) => {
            const pathname = new URL(url).pathname;
            const parts = pathname.split('/');
            const query = new RepoContentQuery(parts[1], parts[2], parts[4], parts[3]);
            return await dispatch(getRepoFile(query)).unwrap();
          };

          const contentObject = await getContentObject(url);
          const htmlContent = marked(contentObject).valueOf();

          setHTML(htmlContent);
        } catch (error) {
          console.error("Error fetching content:", error);
        }
      };

      fetchContent();
    }
  }, [url, dispatch]);

  return <>{html && <div className='content'>
    {title && <h4 className='title'>{title}</h4>}
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  </div>}</>;
}

export default ContentComponent;