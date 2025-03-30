import React, { useEffect, useState } from 'react';

import CheckListComponent from './CheckListComponent';
import Colors from './Colors';
import Gallery from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';
import ProjectDesign from '../../../model/ProjectDesign';
import Task from '@/model/Task';
import CheckList from '@/model/CheckList';
import ContentURL from '@/model/ContentURL';

interface DesignProps {
  design: ProjectDesign;
}

const Design: React.FC<DesignProps> = ({ design }) => {
  const [checkList, setCheckList] = useState<CheckList>(design.checkList);
  const [tasks, setTasks] = useState<Set<Task>>(design.checkList.tasks);
  const [colorsList, setColorsList] = useState(design.colorsList);
  const [gallery, setGallery] = useState(design.gallery);
  const [contentURL, setContentURL] = useState<ContentURL | null>(design.contentURL);

  const { logos, icons, animations, umlDiagrams } = gallery;

  useEffect(() => {
    setCheckList(design.checkList)
  }, [design.checkList, setCheckList]);

  useEffect(() => {
    setTasks(design.checkList.tasks)
  }, [design.checkList.tasks, setTasks]);

  useEffect(() => {
    setColorsList(design.colorsList)
  }, [design.colorsList, setColorsList]);

  useEffect(() => {
    setGallery(design.gallery)
  }, [design.gallery, setGallery]);

  useEffect(() => {
    setContentURL(design.contentURL)
  }, [design.contentURL, setContentURL]);

  return (
    <>
      {(tasks.size > 0 ||
        colorsList.length > 0 ||
        logos.length > 0 || icons.length > 0 || animations.length > 0 || umlDiagrams.length > 0 ||
        contentURL) &&
        <div className="project-process-design" id="project_process_design">
          <h3 className="title">design</h3>

          {tasks.size > 0 && <CheckListComponent checkList={checkList} />}

          {colorsList.length > 0 && <Colors colors={colorsList} />}

          {logos.length > 0 && <Gallery title={'Logos'} gallery={logos} />}

          {icons.length > 0 && <Gallery title={'icons'} gallery={icons} />}

          {animations.length > 0 && <Gallery title={'animations'} gallery={animations} />}

          {umlDiagrams.length > 0 && <Gallery title={'uml diagrams'} gallery={umlDiagrams} />}

          {contentURL && <ContentComponent title={null} content={contentURL} />}
        </div>
      }
    </>
  );
}

export default Design;
