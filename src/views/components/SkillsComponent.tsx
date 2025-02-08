import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import TaxList from './TaxList';
import TaxListIcon from './TaxListIcon';

import type { RootState } from '@/model/store';
import Skills from '@/model/Skills';

interface SkillsComponentProps {
    skillsUsed: Skills | null
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({ skillsUsed }) => {
    const { skillsObject } = useSelector((state: RootState) => state.portfolio);

    const [skills, setSkills] = useState<Skills>(new Skills(skillsObject));

    const { types, languages, frameworks, technologies } = skills;

    useEffect(() => {
        if (skillsObject) {
            setSkills(new Skills(skillsObject))
        }
    }, [skillsObject]);

    useEffect(() => {
        if (skillsUsed) {
            const filteredSkills = skills.show(skillsUsed);
            setSkills(filteredSkills)
        }
    }, [skillsUsed]);

    return (
        <div className="skills" id="skills">
            <h5 className="title">skills</h5>

            {types.size > 0 && <TaxList taxonomies={types} title={'Project Types'} />}

            {languages.size > 0 && <TaxListIcon taxonomies={languages} title={'Languages'} />}

            {frameworks.size > 0 && <TaxListIcon taxonomies={frameworks} title={'Frameworks'} />}

            {technologies.size > 0 && <TaxListIcon taxonomies={technologies} title={'Technologies'} />}
        </div>
    )
}

export default SkillsComponent