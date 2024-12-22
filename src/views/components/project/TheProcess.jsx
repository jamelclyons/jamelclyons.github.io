import ProjectStatus from '../ProjectStatus';
import Design from './Design';
import Development from './Development';
import Delivery from './Delivery';

function TheProcess(props) {
  const { process } = props;

  return (
    <>
      {process && (
        <div className="project-process" id="project_process">
          <h3 class="title">the process</h3>

          <ProjectStatus project_status={process.status} />

          <Design design={process.design} />

          <Development development={process.development} />

          <Delivery delivery={process.delivery} />
        </div>
      )}
    </>
  );
}

export default TheProcess;
