import { useSelector } from 'react-redux';

function ProjectURLs(props) {
  const { project_urls } = props;

  return (
    <>
      {project_urls ? (
        <div className="project-urls">
          {Object.keys(project_urls).map((key, index) => (
            <button
              key={index}
              onClick={() => window.open(project_urls[key].url, '_blank')}>
              <i className={`${project_urls[key].icon}`}></i>
              <h3>{`${project_urls[key].name}`}</h3>
            </button>
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default ProjectURLs;
