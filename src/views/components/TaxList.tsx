import React from 'react';

import Taxonomy from '../../model/Taxonomy';

interface TaxListProps {
  taxonomies: Set<Taxonomy>;
  title: string;
}

const TaxList: React.FC<TaxListProps> = ({ taxonomies, title }) =>{
  const handleClick = (taxonomy: Taxonomy) => {
    window.location.href = `/#/projects/${taxonomy.path}/${taxonomy.id}`;
  };

  return (
    taxonomies && taxonomies?.size > 0 && (
      <div className="tax-list">
        <h4 className="title">{title}</h4>

        <div className="tax-row">
          {Array.from(taxonomies).map((taxonomy, index) =>
            taxonomy && taxonomy.title ? (
              <button
                key={index}
                className="tag"
                onClick={() => handleClick(taxonomy)}>
                <h3>{taxonomy.title}</h3>
              </button>
            ) : null
          )}
        </div>
      </div>
    )
  );
}

export default TaxList;
