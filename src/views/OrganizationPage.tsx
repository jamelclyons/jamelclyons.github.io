import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { RootState } from '../model/store';
import Portfolio from '../model/Portfolio';
import Skills from '@/model/Skills';
import Organization from '@/model/Organization';

import ProjectsComponent from './components/portfolio/ProjectsComponent';
import SkillsComponent from './components/SkillsComponent';
import HeaderOrganizationComponent from './components/HeaderOrganizationComponent';
import ContactBar from './components/ContactBar';
import { pathToSpace } from '@/utilities/String';

interface OrganizationPageProps {
    organizations: Array<Organization>;
    portfolio: Portfolio;
    skills: Skills;
}

const OrganizationPage: React.FC<OrganizationPageProps> = ({ organizations, portfolio, skills }) => {
    const { name } = useParams<string>();

    const { projects } = portfolio;

    const { organizationObject } = useSelector(
        (state: RootState) => state.github);

    const [organization, setOrganization] = useState<Organization>(new Organization(organizationObject));
    const [organizationName, setOrganizationName] = useState<string>();

    useEffect(() => {
        if (name) {
            const orgName = pathToSpace(name);
            setOrganizationName(orgName);
        }
    }, [name]);

    useEffect(() => {
        if (Array.isArray(organizations) && organizations.length > 0) {
            organizations.forEach((org) => {
                if (org.name === organizationName) {
                    setOrganization(org);
                }
            });
        }
    }, [organizations]);

    useEffect(() => {
        document.title = organization.name
    }, []);

    return (
        <section className='organization' id='top'>
            <>
                <HeaderOrganizationComponent organization={organization} />

                <ContactBar contactMethods={organization.contactMethods} />

                {
                    projects &&
                    projects.size > 0 &&
                    name &&
                    <ProjectsComponent projects={portfolio.filterProjectsByLogin(name)} />
                }

                {skills && <SkillsComponent skills={skills} />}
            </>
        </section>
    )
}

export default OrganizationPage