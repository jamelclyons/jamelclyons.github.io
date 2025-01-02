import React from 'react';

import CheckList from './CheckList';
import Colors from './Colors';
import Gallery from '../Gallery';
import ContentComponent from '../ContentComponent';
import ProjectDesign from '../../../model/ProjectDesign';

interface DesignProps {
  design: ProjectDesign;
}

const Design: React.FC<DesignProps> = ({ design }) => {
  const { checkList, colorsList, gallery, content} = design;

  return (
    <>
      <div className="project-process-design" id="project_process_design">
        <h4 className="title">design</h4>

        <CheckList checkList={checkList} />

        <Colors colors={colorsList} />

        <Gallery title={'Logos'} gallery={gallery.logos} />

        <Gallery title={'icons'} gallery={gallery.icons} />

        <Gallery title={'animations'} gallery={gallery.animations} />

        <Gallery title={'uml diagrams'} gallery={gallery.umlDiagrams} />

        <ContentComponent content={content} />
      </div>
    </>
  );
}

export default Design;
