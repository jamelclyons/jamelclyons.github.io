import Gallery from '../Gallery';
import ContentComponent from '../ContentComponent';

function TheProblem(props) {
  const { problem } = props;

  return (
    <>
      <div className="project-problem" id="project_problem">
        <h3 className="title">the problem</h3>

        <Gallery gallery={problem?.gallery} />

        <ContentComponent content={problem?.content} />
      </div>
    </>
  );
}

export default TheProblem;
