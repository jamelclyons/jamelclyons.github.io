import React, { useEffect, useState } from 'react';

import CheckList from './CheckListComponent';
import GalleryComponent from '../GalleryComponent';
import ContentComponent from '../content/ContentComponent';

import ProjectDelivery from '@/model/ProjectDelivery';
import Task from '@/model/Task';
import Gallery from '@/model/Gallery';
import CheckListComponent from './CheckListComponent';

interface DeliveryProps {
  delivery: ProjectDelivery;
}

const Delivery: React.FC<DeliveryProps> = ({ delivery }) => {
  const [checkList, setCheckList] = useState(delivery.checkList);
  const [tasks, setTasks] = useState<Set<Task>>(delivery.checkList.tasks);
  const [gallery, setGallery] = useState<Gallery>(delivery.gallery);
  const [contentURL, setContentURL] = useState(delivery.contentURL);

  useEffect(() => {
    if (delivery.checkList) {
      setCheckList(delivery.checkList);
    }
  }, [delivery.checkList, setCheckList]);

  useEffect(() => {
    if (delivery.checkList.tasks) {
      setTasks(delivery.checkList.tasks);
    }
  }, [delivery.checkList.tasks, setTasks]);

  useEffect(() => {
    if (delivery.gallery) {
      setGallery(delivery.gallery);
    }
  }, [delivery.gallery, setTasks]);

  useEffect(() => {
    if (delivery.contentURL) {
      setContentURL(delivery.contentURL);
    }
  }, [delivery.contentURL, setTasks]);

  const hasContent = tasks.size > 0 || gallery.images.length > 0 || contentURL;

  return (
    hasContent && (
      <div className="project-process-delivery" id="project_process_delivery">
        <h3 className="title">delivery</h3>

        {tasks.size > 0 && <CheckListComponent checkList={checkList} />}

        {gallery.images.length > 0 && <GalleryComponent gallery={gallery.images} title="" />}

        {contentURL && <ContentComponent title={null} content={contentURL} />}
      </div>
    )
  );
};

export default Delivery;