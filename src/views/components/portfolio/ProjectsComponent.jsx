import ProjectStatus from '../ProjectStatus';
import ProjectDescription from './ProjectDescription';
import StatusBarComponent from '../StatusBarComponent';

function ProjectsComponent(props) {
  const { projects } = props;

  return (
    <>
      {Array.isArray(projects) ? (
        projects.map((project, index) => (
          <a href={`#/portfolio/${project.id}`}>
            <div key={index} className="project-card card">
              <h2 className="title">{project.title}</h2>

              {Array.isArray(project.solution.gallery) &&
              project.solution.gallery.length > 0 ? (
                <img
                  className="photo"
                  src={project.solution.gallery[0]}
                  alt=""
                />
              ) : (
                ''
              )}

              <ProjectDescription description={project.description} />

              {project.process && (
                <ProjectStatus project_status={project.process?.status} />
              )}
            </div>
          </a>
        ))
      ) : (
        <StatusBarComponent />
      )}
    </>
  );
}

export default ProjectsComponent;
