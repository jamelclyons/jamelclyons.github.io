import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import TaxList from './TaxList';
import TaxListIcon from './TaxListIcon';

import type { AppDispatch, RootState } from '@/model/store';
import Skills from '@/model/Skills';

import { setMessage, setMessageType } from '@/controllers/messageSlice';
import { getSkills } from '@/controllers/taxonomiesSlice';
import ProjectSkills from '@/model/ProjectSkills';

interface SkillsComponentProps {
    projectSkills: ProjectSkills | null
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({ projectSkills }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { taxonomiesLoading, skillsObject } = useSelector((state: RootState) => state.taxonomies);

    const [skills, setSkills] = useState<Skills>(new Skills());

    const { types, languages, frameworks, technologies } = skills;

    // useEffect(() => {
    //     console.log(skillsObject)
    //     if (skillsUsed === null && skillsObject) {
    //         setSkills(new Skills(skillsObject))
    //     }
    // }, [skillsUsed, skillsObject]);

    useEffect(() => {
        if (projectSkills) {
            setSkills(projectSkills)
        }
    }, [projectSkills, setSkills]);

    // useEffect(() => {
    //     console.log(skillsObject)
    //     if (skillsObject === null) {
    //         dispatch(getSkills());
    //     }
    // }, [skillsObject, dispatch]);

    useEffect(() => {
        if (taxonomiesLoading) {
            dispatch(setMessageType('info'));
            dispatch(setMessage('Now Loading Skills'));
        }
    }, [taxonomiesLoading]);

    return (
        <div className="skills" id="skills">
            <h4 className="title">skills</h4>

            {types.size > 0 && <TaxList taxonomies={types} title={'Project Types'} />}

            {languages.size > 0 && <TaxListIcon taxonomies={languages} title={'Languages'} />}

            {frameworks.size > 0 && <TaxListIcon taxonomies={frameworks} title={'Frameworks'} />}

            {technologies.size > 0 && <TaxListIcon taxonomies={technologies} title={'Technologies'} />}
        </div>
    )
}

export default SkillsComponent