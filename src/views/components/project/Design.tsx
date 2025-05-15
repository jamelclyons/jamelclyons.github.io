import React, { useEffect, useState } from 'react';

import CheckListComponent from './CheckListComponent';
import Colors from './Colors';
import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';

import Project from '@/model/Project';
import ContentURL from '@/model/ContentURL';
import Color from '@/model/Color';
import Image from '@/model/Image';
import CheckList from '@/model/CheckList';
import ProjectQuery from '@/model/ProjectQuery';

interface DesignProps {
  project: Project;
}

const Design: React.FC<DesignProps> = ({ project }) => {
  const [colors, setColors] = useState<Array<Color> | null>(null);
  const [logos, setLogos] = useState<Array<Image> | null>(null);
  const [icons, setIcons] = useState<Array<Image> | null>(null);
  const [animations, setAnimations] = useState<Array<Image> | null>(null);
  const [umlDiagrams, setUmlDiagrams] = useState<Array<Image> | null>(null);
  const [content, setContent] = useState<ContentURL | null>(null);
  const [checkList, setCheckList] = useState<CheckList | null>(null);
  const [query, setQuery] = useState<ProjectQuery | null>(null);

  useEffect(() => {
    if (project.process && project.process.design
      && project.process.design.colorsList
      && project.process.design.colorsList.length > 0) {
      setColors(project.process.design.colorsList)
    }
  }, [project]);

  useEffect(() => {
    if (project.process && project.process.design
      && project.process.design.contentURL
      && project.process.design.contentURL.path === 'Design.md') {
      setContent(project.process.design.contentURL)
    }
  }, [project]);

  useEffect(() => {
    if (project.process && project.process.design
      && project.process.design.gallery
      && project.process.design.gallery.logos
      && project.process.design.gallery.logos.length > 0) {
      setLogos(project.process.design.gallery.logos)
    }
  }, [project]);

  useEffect(() => {
    if (project.process && project.process.design
      && project.process.design.gallery
      && project.process.design.gallery.icons
      && project.process.design.gallery.icons.length > 0) {
      setIcons(project.process.design.gallery.icons)
    }
  }, [project]);

  useEffect(() => {
    if (project.process && project.process.design
      && project.process.design.gallery
      && project.process.design.gallery.animations
      && project.process.design.gallery.animations.length > 0) {
      setAnimations(project.process.design.gallery.animations)
    }
  }, [project]);

  useEffect(() => {
    if (project.process && project.process.design
      && project.process.design.gallery
      && project.process.design.gallery.umlDiagrams
      && project.process.design.gallery.umlDiagrams.length > 0) {
      setUmlDiagrams(project.process.design.gallery.umlDiagrams)
    }
  }, [project]);

  useEffect(() => {
    if (project.process && project.process.design
      && project.process.design.checkList) {
      setCheckList(project.process.design.checkList)
    }
  }, [project]);

  useEffect(() => {
    if (project.query) {
      setQuery(project.query)
    }
  }, [project]);

  const hasContent = colors || logos || icons || animations || umlDiagrams || content || (checkList && query);

  return (
    <>
      {hasContent &&
        <div className="project-process-design" id="project_process_design">
          <h3 className="title">design</h3>

          {colors &&
            <Colors colors={colors} />}

          {logos &&
            <GalleryComponent title={'Logos'} gallery={logos} />}

          {icons &&
            <GalleryComponent title={'icons'} gallery={icons} />}

          {animations &&
            <GalleryComponent title={'animations'} gallery={animations} />}

          {umlDiagrams &&
            <GalleryComponent title={'uml diagrams'} gallery={umlDiagrams} />}

          {content &&
            <ContentComponent title={null} content={content} />}

          {checkList && query &&
            <CheckListComponent checkList={checkList} query={query} />}
        </div>
      }
    </>
  );
}

export default Design;
