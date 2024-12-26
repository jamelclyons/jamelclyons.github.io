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

  return (
    <>
      <div className="project-process-design" id="project_process_design">
        <h4 className="title">design</h4>

        <CheckList checklist={design?.checkList} />

        <Colors colors={design?.colorsList} />

        <Gallery title={'Logos'} gallery={design?.gallery?.logos} />

        <Gallery title={'icons'} gallery={design?.gallery?.icons} />

        <Gallery title={'animations'} gallery={design?.gallery?.animations} />

        <Gallery title={'uml diagrams'} gallery={design?.gallery?.umlDiagrams} />

        <ContentComponent content={design?.content} />
      </div>
    </>
  );
}

export default Design;
