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
  const { checkList, colorsList, gallery, content } = design;
  const { logos, icons, animations, umlDiagrams } = gallery;

  return (
    <>
      {!design.isEmpty &&
        <div className="project-process-design" id="project_process_design">
          <h4 className="title">design</h4>

          {checkList.length > 0 && <CheckList checkList={checkList} />}

          {colorsList.length > 0 && <Colors colors={colorsList} />}

          {logos.length > 0 && <Gallery title={'Logos'} gallery={logos} />}

          {logos.length > 0 && <Gallery title={'icons'} gallery={icons} />}

          {logos.length > 0 && <Gallery title={'animations'} gallery={animations} />}

          {logos.length > 0 && <Gallery title={'uml diagrams'} gallery={umlDiagrams} />}

          {content.length > 0 && <ContentComponent content={content} />}
        </div>
      }
    </>
  );
}

export default Design;
