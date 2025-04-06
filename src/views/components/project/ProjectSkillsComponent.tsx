import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import TaxListIcon from '../TaxListIcon';

import { setMessage, setMessageType } from '@/controllers/messageSlice';

import type { AppDispatch, RootState } from '@/model/store';
import ProjectSkills from '@/model/ProjectSkills';
import Project from '@/model/Project';

interface ProjectSkillsComponentProps {
    project: Project;
}

const ProjectSkillsComponent: React.FC<ProjectSkillsComponentProps> = ({ project }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { taxonomiesLoading } = useSelector((state: RootState) => state.taxonomies);

    const [skills, setSkills] = useState<ProjectSkills | null>(null);

    useEffect(() => {
        setSkills(project.process?.development?.skills ? new ProjectSkills().show(project.process.development.skills) : new ProjectSkills);
    }, [project]);

    useEffect(() => {
        if (taxonomiesLoading) {
            dispatch(setMessageType('info'));
            dispatch(setMessage('Now Loading Skills'));
        }
    }, [taxonomiesLoading]);

    const hasContent = skills?.types || skills?.languages || skills?.frameworks || skills?.technologies || skills?.services;

    return (
        <>
            {project.process && project.process.development && project.process.development.skills && hasContent &&
                <div className="skills" id="skills">
                    <h4 className="title">skills</h4>

                    {skills.types && skills.types.size > 0 && <TaxListIcon taxonomiesSet={skills.types} taxonomiesTitle={'Project Types'} />}

                    {skills.languages && skills.languages.size > 0 && <TaxListIcon taxonomiesSet={skills.languages} taxonomiesTitle={'Languages'} />}

                    {skills.frameworks && skills.frameworks.size > 0 && <TaxListIcon taxonomiesSet={skills.frameworks} taxonomiesTitle={'Frameworks'} />}

                    {skills.technologies && skills.technologies.size > 0 && <TaxListIcon taxonomiesSet={skills.technologies} taxonomiesTitle={'Technologies'} />}

                    {skills.services && skills.services.size > 0 && <TaxListIcon taxonomiesSet={skills.services} taxonomiesTitle={'Services'} />}
                </div>}
        </>
    )
}

export default ProjectSkillsComponent;