import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import TaxList from './TaxList';
import TaxListIcon from './TaxListIcon';

import type { AppDispatch, RootState } from '@/model/store';
import Skills from '@/model/Skills';

import { setMessage, setMessageType } from '@/controllers/messageSlice';
import { getSkills } from '@/controllers/taxonomiesSlice';

interface SkillsComponentProps {
    skillsUsed: Skills | null
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({ skillsUsed }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { taxonomiesLoading, skillsObject } = useSelector((state: RootState) => state.taxonomies);

    const [skills, setSkills] = useState<Skills>(new Skills());

    const { types, languages, frameworks, technologies } = skills;

    useEffect(() => {
        if (skillsUsed === null && skillsObject) {
            setSkills(new Skills(skillsObject))
        }
    }, [skillsUsed, skillsObject]);

    useEffect(() => {
        if (skillsUsed) {
            setSkills(skillsUsed)
        }
    }, [skillsUsed]);

    useEffect(() => {
        if (skillsObject === null) {
            dispatch(getSkills());
        }
    }, [skillsObject, dispatch]);

    useEffect(() => {
        if (taxonomiesLoading) {
            dispatch(setMessageType('info'));
            dispatch(setMessage('Now Loading Skills'));
        }
    }, [taxonomiesLoading]);

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