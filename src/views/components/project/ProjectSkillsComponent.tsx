import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import TaxListIcon from '../TaxListIcon';

import { setMessage, setMessageType } from '@/controllers/messageSlice';

import type { AppDispatch, RootState } from '@/model/store';
import ProjectSkills from '@/model/ProjectSkills';
import { Framework, Language, ProjectType, Service, Technology } from '@/model/Taxonomy';
import Skills from '@/model/Skills';

interface ProjectSkillsComponentProps {
    projectSkills: ProjectSkills;
}

const ProjectSkillsComponent: React.FC<ProjectSkillsComponentProps> = ({ projectSkills }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { taxonomiesLoading } = useSelector((state: RootState) => state.taxonomies);

    const [skills, setSkills] = useState<ProjectSkills>(new ProjectSkills);
    const [types, setTypes] = useState<Set<ProjectType> | null>(null);
    const [languages, setLanguages] = useState<Set<Language> | null>(null);
    const [frameworks, setFrameworks] = useState<Set<Framework> | null>(null);
    const [technologies, setTechnologies] = useState<Set<Technology> | null>(null);
    const [services, setServices] = useState<Set<Service> | null>(null);

    useEffect(() => {
        if (projectSkills) {
            setSkills(skills.show(projectSkills));
        }
    }, [projectSkills, setSkills]);

    useEffect(() => {
        if (projectSkills?.types && projectSkills.types.size > 0) {
            setTypes(skills.types)
        }
    }, [projectSkills, setTypes]);

    useEffect(() => {
        if (projectSkills?.languages && projectSkills.languages.size > 0) {
            setLanguages(skills.languages)
        }
    }, [projectSkills, setLanguages]);

    useEffect(() => {
        if (projectSkills?.frameworks && projectSkills.frameworks.size > 0) {
            setFrameworks(skills.frameworks)
        }
    }, [projectSkills, setFrameworks]);

    useEffect(() => {
        if (projectSkills?.technologies && projectSkills?.technologies.size > 0) {
            setTechnologies(skills.technologies)
        }
    }, [projectSkills, setTechnologies]);

    useEffect(() => {
        if (projectSkills?.services && projectSkills.services.size > 0) {
            setServices(skills.services)
        }
    }, [projectSkills, setServices]);

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

export default ProjectSkillsComponent;