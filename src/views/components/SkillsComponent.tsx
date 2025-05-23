import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import TaxListIcon from './TaxListIcon';

import { setMessage, setMessageType } from '@/controllers/messageSlice';

import type { AppDispatch, RootState } from '@/model/store';
import ProjectSkills from '@/model/ProjectSkills';
import { Framework, Language, ProjectType, Service, Technology } from '@/model/Taxonomy';
import Skills from '@/model/Skills';

interface SkillsComponentProps {
    projectSkills: ProjectSkills | null
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({ projectSkills }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { taxonomiesLoading } = useSelector((state: RootState) => state.taxonomies);

    const [skills, setSkills] = useState<Skills | ProjectSkills>(new Skills());
    const [types, setTypes] = useState<Set<ProjectType> | null>(skills.types);
    const [languages, setLanguages] = useState<Set<Language> | null>(skills.languages);
    const [frameworks, setFrameworks] = useState<Set<Framework> | null>(skills.frameworks);
    const [technologies, setTechnologies] = useState<Set<Technology> | null>(skills.technologies);
    const [services, setServices] = useState<Set<Service> | null>(null);

    useEffect(() => {
        if (projectSkills) {
            console.log(projectSkills)
            setSkills(skills.show(projectSkills))
        }
    }, [projectSkills, setSkills]);

    useEffect(() => {
        if (skills?.types) {
            setTypes(skills.types)
        }
    }, [skills?.types, setTypes]);

    useEffect(() => {
        if (skills?.languages) {
            setLanguages(skills.languages)
        }
    }, [skills?.languages, setLanguages]);

    useEffect(() => {
        if (skills?.frameworks) {
            setFrameworks(skills.frameworks)
        }
    }, [skills?.frameworks, setFrameworks]);

    useEffect(() => {
        if (skills?.technologies) {
            setTechnologies(skills.technologies)
        }
    }, [skills?.technologies, setTechnologies]);

    useEffect(() => {
        if (skills?.services) {
            setServices(skills.services)
        }
    }, [skills?.services, setServices]);

    useEffect(() => {
        if (taxonomiesLoading) {
            dispatch(setMessageType('info'));
            dispatch(setMessage('Now Loading Skills'));
        }
    }, [taxonomiesLoading]);

    return (
        <div className="skills" id="skills">
            <h4 className="title">skills</h4>

            {types && types.size > 0 && <TaxListIcon taxonomiesSet={types} taxonomiesTitle={'Project Types'} />}

            {languages && languages.size > 0 && <TaxListIcon taxonomiesSet={languages} taxonomiesTitle={'Languages'} />}

            {frameworks && frameworks.size > 0 && <TaxListIcon taxonomiesSet={frameworks} taxonomiesTitle={'Frameworks'} />}

            {technologies && technologies.size > 0 && <TaxListIcon taxonomiesSet={technologies} taxonomiesTitle={'Technologies'} />}

            {services && services.size > 0 && <TaxListIcon taxonomiesSet={services} taxonomiesTitle={'Services'} />}
        </div>
    )
}

export default SkillsComponent