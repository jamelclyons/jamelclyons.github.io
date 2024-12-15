function ProjectDescription(props) {
  const { description } = props;

  return (
    <>
      {description && (
        <div className="project-description">
          <p>{description}</p>
        </div>
      )}
    </>
  );
}

export default ProjectDescription;
