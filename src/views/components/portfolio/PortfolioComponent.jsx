import ProjectsComponent from './ProjectsComponent';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';

function PortfolioComponent(props) {
  const { portfolio, projectTypes, languages, frameworks, technologies } =
    props;

    return (
    <>
      {portfolio && (
        <main className="portfolio">
          <h1 class="title">portfolio</h1>

          <ProjectsComponent projects={portfolio} />

          <TaxList tax={projectTypes} title={'Project Types'} />

          <TaxListIcon tax={languages} title={'Languages'} />

          <TaxListIcon tax={frameworks} title={'Frameworks'} />

          <TaxListIcon tax={technologies} title={'Technologies'} />
        </main>
      )}
    </>
  );
}

export default PortfolioComponent;
