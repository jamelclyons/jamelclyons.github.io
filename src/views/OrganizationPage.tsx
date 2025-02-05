import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProjectsComponent from './components/portfolio/ProjectsComponent';
import SkillsComponent from './components/SkillsComponent';
import HeaderOrganizationComponent from './components/HeaderOrganizationComponent';
import ContactBar from './components/ContactBar';
import StatusBarComponent from './components/StatusBarComponent';

import { setMessage, setMessageType, setShowStatusBar } from '../controllers/messageSlice';
import { getOrganization } from '@/controllers/organizationSlice';

import { pathToSpace } from '@/utilities/String';

import type { AppDispatch, RootState } from '../model/store';
import Organizations from '@/model/Organizations';
import Portfolio from '../model/Portfolio';
import Skills from '@/model/Skills';
import Organization from '@/model/Organization';

interface OrganizationPageProps {
    organizations: Organizations;
    portfolio: Portfolio;
    skills: Skills;
}

const OrganizationPage: React.FC<OrganizationPageProps> = ({ organizations, portfolio, skills }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { login } = useParams<string>();

    const { list } = organizations;
    const { projects } = portfolio;

    const { organizationObject } = useSelector(
        (state: RootState) => state.organization);

    const [organization, setOrganization] = useState<Organization>();

    useEffect(() => {
        if (Array.isArray(list) && list.length > 0) {
            list.forEach((org) => {
                if (org.login === login) {
                    setOrganization(org);
                }
            });
        }
    }, [organizations]);

    useEffect(() => {
        if (portfolio.projects.size === 0 && login) {
            dispatch(getOrganization(login));
        }
    }, [dispatch, portfolio]);

    useEffect(() => {
        if (organizationObject) {
            setOrganization(new Organization(organizationObject));
        }
    }, [organizationObject]);

    useEffect(() => {
        if (organization) {
            document.title = organization.name
        }
    }, [organization]);

    return (
        <section className='organization' id='top'>
            <>
                {organization && <HeaderOrganizationComponent organization={organization} />}

                {organization && <ContactBar contactMethods={organization.contactMethods} location='' />}

                {
                    organization &&
                    projects.size > 0 &&
                    <ProjectsComponent projects={portfolio.filterProjectsByLogin(organization.login)} />
                }

                {skills && <SkillsComponent skills={skills} />}
            </>
        </section>
    )
}

export default OrganizationPage