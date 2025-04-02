import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import TaxList from './TaxList';
import TaxListIcon from './TaxListIcon';

import type { AppDispatch, RootState } from '@/model/store';
import Skills from '@/model/Skills';

import { setMessage, setMessageType } from '@/controllers/messageSlice';
import ProjectSkills from '@/model/ProjectSkills';
import { Framework, Language, ProjectType, Service, Technology } from '@/model/Taxonomy';

interface SkillsComponentProps {
    projectSkills: ProjectSkills | null
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({ projectSkills }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { taxonomiesLoading } = useSelector((state: RootState) => state.taxonomies);

    const [types, setTypes] = useState<Set<ProjectType>>();
    const [languages, setLanguages] = useState<Set<Language>>();
    const [frameworks, setFrameworks] = useState<Set<Framework>>();
    const [technologies, setTechnologies] = useState<Set<Technology>>();
    const [services, setServices] = useState<Set<Service>>();

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

            {types && types.size > 0 && <TaxListIcon taxonomiesSet={types} taxonomiesTitle={'Project Types'} />}

            {languages && languages.size > 0 && <TaxListIcon taxonomiesSet={languages} taxonomiesTitle={'Languages'} />}

            {frameworks && frameworks.size > 0 && <TaxListIcon taxonomiesSet={frameworks} taxonomiesTitle={'Frameworks'} />}

            {technologies && technologies.size > 0 && <TaxListIcon taxonomiesSet={technologies} taxonomiesTitle={'Technologies'} />}

            {services && services.size > 0 && <TaxListIcon taxonomiesSet={services} taxonomiesTitle={'Services'} />}
        </div>
    )
}

export default SkillsComponent