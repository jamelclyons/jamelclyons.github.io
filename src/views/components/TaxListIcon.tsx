import React from 'react';

import ProjectSkillsBar from './ProjectSkillsBar';
import Taxonomy from '../../model/Taxonomy';

interface TaxListIconProps {
  title: string;
  taxonomies: Array<Record<string, any>>;
}

const TaxListIcon: React.FC<TaxListIconProps> = ({ title, taxonomies }) => {

  return (
    taxonomies.length > 0 && (
      <div className="tax-list">
        <h4 className="title">{title}</h4>

        <div className="tax-row">
          <ProjectSkillsBar skills={taxonomies} />
        </div>
      </div>
    )
  );
}

export default TaxListIcon;
