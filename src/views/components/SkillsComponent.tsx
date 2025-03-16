import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import TaxList from './TaxList';
import TaxListIcon from './TaxListIcon';

import type { AppDispatch, RootState } from '@/model/store';
import Skills from '@/model/Skills';

import { setMessage, setMessageType } from '@/controllers/messageSlice';
import { getSkills } from '@/controllers/taxonomiesSlice';
import ProjectSkills from '@/model/ProjectSkills';
import { Framework, Language, ProjectType, Service, Technology } from '@/model/Taxonomy';

interface SkillsComponentProps {
    projectSkills: ProjectSkills | null
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({ projectSkills }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { taxonomiesLoading } = useSelector((state: RootState) => state.taxonomies);

    const [skills, setSkills] = useState<ProjectSkills | Skills>(projectSkills ?? new Skills());
    const [types, setTypes] = useState<Set<ProjectType>>(skills.types);
    const [languages, setLanguages] = useState<Set<Language>>(skills.languages);
    const [frameworks, setFrameworks] = useState<Set<Framework>>(skills.frameworks);
    const [technologies, setTechnologies] = useState<Set<Technology>>(skills.technologies);
    const [services, setServices] = useState<Set<Service>>(skills.services);

    useEffect(() => {
        if (projectSkills) {
            setSkills(projectSkills)
        }
    }, [projectSkills, setSkills]);

    useEffect(() => {
        if (projectSkills?.types) {
            setTypes(projectSkills.types)
        }
    }, [projectSkills?.types, setTypes]);

    useEffect(() => {
        if (projectSkills?.languages) {
            setLanguages(projectSkills.languages)
        }
    }, [projectSkills?.languages, setLanguages]);

    useEffect(() => {
        if (projectSkills?.frameworks) {
            setFrameworks(projectSkills.frameworks)
        }
    }, [projectSkills?.frameworks, setFrameworks]);

    useEffect(() => {
        if (projectSkills?.technologies) {
            setTechnologies(projectSkills.technologies)
        }
    }, [projectSkills?.technologies, setTechnologies]);

    useEffect(() => {
        if (projectSkills?.services) {
            setServices(projectSkills.services)
        }
    }, [projectSkills?.services, setServices]);

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

            {services.size > 0 && <TaxListIcon taxonomies={services} title={'Services'} />}
        </div>
    )
}

export default SkillsComponent