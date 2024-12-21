import Gallery from './Gallery';
import ProjectDescription from './ProjectDescription';
import ProjectDetails from './ProjectDetails';
import TheSolution from './TheSolution';
import ProjectURLs from './ProjectURLs';
import TheProblem from './TheProblem';
import TaxListIcon from './TaxListIcon';
import ProjectTeam from './ProjectTeam';
import TheProcess from './TheProcess';

function ProjectComponent(props) {
  const {
    title,
    description,
    features,
    currency,
    price,
    solution_gallery,
    project_urls,
    project_details,
    the_solution,
    the_problem,
    project_team,
    project_types,
    skills,
    frameworks,
    technologies,
  } = props;

  return (
    <>
      <main className="project">
        {title && <h1 class="title">{title}</h1>}

        <Gallery gallery={solution_gallery} />

        <ProjectDescription description={description} />

        <TheSolution
          features={features}
          currency={currency}
          price={price}
          the_solution={the_solution}
        />

        <ProjectURLs project_urls={project_urls} />

        {/* Project details is for clients only */}
        <ProjectDetails project_details={project_details} />

        <TheProcess />

        <TheProblem the_problem={the_problem} />

        <TaxListIcon tax={project_types} title={'project types'} />

        <TaxListIcon tax={skills} title={'skills'} />

        <TaxListIcon tax={frameworks} title={'frameworks'} />

        <TaxListIcon tax={technologies} title={'technologies'} />

        <ProjectTeam project_team={project_team} />
      </main>
    </>
  );
}

export default ProjectComponent;
