import React from 'react';

import CheckList from './CheckList';
import Colors from './Colors';
import Gallery from '../Gallery';
import ContentComponent from '../content/ContentComponent';
import ProjectDesign from '../../../model/ProjectDesign';

interface DesignProps {
  design: ProjectDesign;
}

const Design: React.FC<DesignProps> = ({ design }) => {
  const { checkList, colorsList, gallery, contentURL } = design;
  const { logos, icons, animations, umlDiagrams } = gallery;

  return (
    <>
      {(checkList.length > 0 ||
        colorsList.length > 0 ||
        logos.length > 0 || icons.length > 0 || animations.length > 0 || umlDiagrams.length > 0 ||
        contentURL) &&
        <div className="project-process-design" id="project_process_design">
          <h4 className="title">design</h4>

          {checkList.length > 0 && <CheckList checkList={checkList} />}

          {colorsList.length > 0 && <Colors colors={colorsList} />}

          {logos.length > 0 && <Gallery title={'Logos'} gallery={logos} />}

          {icons.length > 0 && <Gallery title={'icons'} gallery={icons} />}

          {animations.length > 0 && <Gallery title={'animations'} gallery={animations} />}

          {umlDiagrams.length > 0 && <Gallery title={'uml diagrams'} gallery={umlDiagrams} />}

          {contentURL && <ContentComponent title={''} url={contentURL} />}
        </div>
      }
    </>
  );
}

export default Design;
