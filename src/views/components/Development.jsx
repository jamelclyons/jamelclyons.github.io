import CheckList from './CheckList';
import ContentComponent from './ContentComponent';
import ProjectURLs from './ProjectURLs';
import Versions from './Versions';

function Development(props) {
  const { development } = props;

  return (
    <>
      <div
        className="project-process-development"
        id="project_process_development">
        <h4 class="title">development</h4>

        <CheckList checkList={development.checkList} />

        <ContentComponent content={development.content} />

        <ProjectURLs project_urls={development.repoURL} />

        <Versions versions_list={development.versionsList} />
      </div>
    </>
  );
}

export default Development;
