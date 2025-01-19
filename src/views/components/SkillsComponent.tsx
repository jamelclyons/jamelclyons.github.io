import React from 'react'

import TaxList from './TaxList';
import TaxListIcon from './TaxListIcon';

import Skills from '@/model/Skills';

interface SkillsComponentProps {
    skills: Skills
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({ skills }) => {
    const { types, languages, frameworks, technologies } = skills;
    
    return (
        <>
            {types.size > 0 && <TaxList taxonomies={types} title={'Project Types'} />}

            {languages.size > 0 && <TaxListIcon taxonomies={languages} title={'Languages'} />}

            {frameworks.size > 0 && <TaxListIcon taxonomies={frameworks} title={'Frameworks'} />}

            {technologies.size > 0 && <TaxListIcon taxonomies={technologies} title={'Technologies'} />}
        </>
    )
}

export default SkillsComponent