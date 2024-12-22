import Member from '../member/Member';

function ProjectTeam(props) {
  const { project_team } = props;

  return (
    <>
      {Array.isArray(project_team) && (
        <div className="project-team">
          <h4 className="title">Project Team</h4>

          <div className="project-team-list">
            {project_team.map((team_member, index) => (
              <Member key={team_member.id} member={team_member} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectTeam;
