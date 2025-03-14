import React, { useEffect, useState } from "react";

import ButtonIconExternal from "../ButtonIconExternal";

import ProjectURLs from "@/model/ProjectURLs";
import ProjectURL from "@/model/ProjectURL";

interface ProjectURLsProps {
  projectUrls: ProjectURLs;
}

const ProjectURLsComponent: React.FC<ProjectURLsProps> = ({ projectUrls }) => {
  const [homepage, setHomepage] = useState<ProjectURL>(projectUrls.homepage);
  const [ios, setIos] = useState<ProjectURL>(projectUrls.ios);
  const [android, setAndroid] = useState<ProjectURL>(projectUrls.android);

  useEffect(() => {
    if (projectUrls.homepage) {
      setHomepage(projectUrls.homepage);
    }
  }, [projectUrls.homepage, setHomepage]);

  useEffect(() => {
    if (projectUrls.ios) {
      setIos(projectUrls.ios);
    }
  }, [projectUrls.ios, setIos]);

  useEffect(() => {
    if (projectUrls.android) {
      setAndroid(projectUrls.android);
    }
  }, [projectUrls.android, setAndroid]);

  return (
    <>
      <div className="project-urls">
        {homepage.url && <ButtonIconExternal buttonProps={homepage} />}

        {ios.url && <ButtonIconExternal buttonProps={ios} />}

        {android.url && <ButtonIconExternal buttonProps={android} />}
      </div>
    </>
  );
}

export default ProjectURLsComponent;
