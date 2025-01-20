import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { AppDispatch, RootState } from '../model/store';
import Portfolio from '../model/Portfolio';
import Skills from '@/model/Skills';
import Organization from '@/model/Organization';

import ProjectsComponent from './components/portfolio/ProjectsComponent';
import SkillsComponent from './components/SkillsComponent';
import HeaderOrganizationComponent from './components/HeaderOrganizationComponent';

interface OrganizationPageProps {
    organizations: Array<Organization>;
    portfolio: Portfolio;
    skills: Skills;
}

const OrganizationPage: React.FC<OrganizationPageProps> = ({ organizations, portfolio, skills }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { login } = useParams<string>();

    const { projects } = portfolio;

    const { organizationObject, organizationReposObject } = useSelector(
        (state: RootState) => state.github);
    const { portfolioLoading, portfolioErrorMessage } = useSelector(
        (state: RootState) => state.portfolio
    );

    const [organization, setOrganization] = useState<Organization>(new Organization(organizationObject));

    useEffect(() => {
        if (Array.isArray(organizations) && organizations.length > 0) {
            organizations.forEach((org) => {
                if (org.login === login) {
                    setOrganization(org);
                }
            });
        }
    }, [organizations]);

    useEffect(() => {
        document.title = `ORG > ${organization.name}`
    }, []);

    return (
        <section className='organization' id='top'>
            <>
                <HeaderOrganizationComponent organization={organization} />

                {
                    projects &&
                    projects.size > 0 &&
                    login &&
                    <ProjectsComponent projects={portfolio.filterProjectsByLogin(login)} />
                }

                {skills && <SkillsComponent skills={skills} />}
            </>
        </section>
    )
}

export default OrganizationPage