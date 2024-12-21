import { useSelector } from 'react-redux';

function Development() {
  const { development, development_check_list, git_repo } = useSelector(
    (state) => state.portfolio
  );

  return (
    <>
      {development_check_list || development || git_repo ? (
        <div
          className="project-process-development"
          id="project_process_development">
          <h4 class="title">DEVELOPMENT</h4>

          <CheckList checklist={development_check_list} />
          <Card text={development} />
          <ProjectURLs project_urls={git_repo} />
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Development;
