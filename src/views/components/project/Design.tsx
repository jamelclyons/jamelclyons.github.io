import React, { useEffect, useState } from 'react';

import CheckListComponent from './CheckListComponent';
import Colors from './Colors';
import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';

import ProjectDesign from '@/model/ProjectDesign';
import CheckList from '@/model/CheckList';
import ContentURL from '@/model/ContentURL';
import Color from '@/model/Color';
import Gallery from '@/model/Gallery';

interface DesignProps {
  design: ProjectDesign;
}

const Design: React.FC<DesignProps> = ({ design }) => {
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [colorsList, setColorsList] = useState<Array<Color> | null>(null);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [contentURL, setContentURL] = useState<ContentURL | null>(null);

  useEffect(() => {
    setCheckList(design.checkList)
  }, [design, setCheckList]);

  useEffect(() => {
    setColorsList(design.colorsList)
  }, [design, setColorsList]);

  useEffect(() => {
    setGallery(design.gallery)
  }, [design, setGallery]);

  useEffect(() => {
    setContentURL(design.contentURL)
  }, [design, setContentURL]);

  const hasContent = checkList || colorsList || gallery || contentURL;

  return (
    <>
      {hasContent &&
        <div className="project-process-design" id="project_process_design">
          <h3 className="title">design</h3>

          {checkList && <CheckListComponent checkList={checkList} />}

          {colorsList && colorsList.length > 0 && <Colors colors={colorsList} />}

          {gallery && gallery.logos && gallery.logos.length > 0 && <GalleryComponent title={'Logos'} gallery={gallery.logos} />}

          {gallery && gallery.icons && gallery.icons.length > 0 && <GalleryComponent title={'icons'} gallery={gallery.icons} />}

          {gallery && gallery.animations && gallery.animations.length > 0 && <GalleryComponent title={'animations'} gallery={gallery.animations} />}

          {gallery && gallery.umlDiagrams && gallery.umlDiagrams.length > 0 && <GalleryComponent title={'uml diagrams'} gallery={gallery.umlDiagrams} />}

          {contentURL && <ContentComponent title={null} content={contentURL} />}
        </div>
      }
    </>
  );
}

export default Design;
