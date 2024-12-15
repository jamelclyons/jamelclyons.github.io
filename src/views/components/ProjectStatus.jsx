function ProjectStatus(props) {
  const { project_status } = props;

  return (
    <>
      {project_status && (
        <>
          <div className="project-status">
            <h4>STATUS</h4>
            <progress min="0" value={project_status} max="100"></progress>
            <p>{project_status}% Completed</p>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectStatus;
