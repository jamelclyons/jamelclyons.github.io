import { useSelector } from 'react-redux';

import ProjectStatus from './ProjectStatus';
import Versions from './Versions';
import Design from './Design';
import Development from './Development';
import Delivery from './Delivery';

function TheProcess() {
  const { project_status } = useSelector((state) => state.portfolio);

  return (
    <>
      {project_status && (
        <div className="project-process" id="project_process">
          <h3 class="title">THE PROCESS</h3>

          <ProjectStatus project_status={project_status} />

          <Versions />

          <Design />

          <Development />

          <Delivery />
        </div>
      )}
    </>
  );
}

export default TheProcess;
