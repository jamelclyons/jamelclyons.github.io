import ProjectSkillsBar from './ProjectSkillsBar';

function TaxListIcon(props) {
  const { tax, title } = props;

  return (
    Array.isArray(tax) && (
      <div className="tax-list">
        <h4 className="title">{title}</h4>

        <div className="tax-row">
          <ProjectSkillsBar skills={tax} />
        </div>
      </div>
    )
  );
}

export default TaxListIcon;
