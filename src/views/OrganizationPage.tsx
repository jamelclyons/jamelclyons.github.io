import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProjectsComponent from './components/portfolio/ProjectsComponent';
import SkillsComponent from './components/SkillsComponent';
import HeaderOrganizationComponent from './components/HeaderOrganizationComponent';
import ContactBar from './components/ContactBar';

import { setMessage, setMessageType } from '../controllers/messageSlice';
import { getOrganization } from '@/controllers/organizationSlice';
import { getPortfolio } from '@/controllers/portfolioSlice';
import { getAuthenticatedUserAccount } from '@/controllers/userSlice';

import type { AppDispatch, RootState } from '../model/store';
import Portfolio from '../model/Portfolio';
import Organization from '@/model/Organization';

const OrganizationPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { login } = useParams<string>();

    const { organizationObject } = useSelector(
        (state: RootState) => state.organization);
    const { portfolioLoading, portfolioObject } = useSelector((state: RootState) => state.portfolio);
    const { authenticatedUserObject } = useSelector((state: RootState) => state.user);

    const [organization, setOrganization] = useState<Organization>();
    const [portfolio, setPortfolio] = useState<Portfolio>(new Portfolio);

    const { projects } = portfolio;

    useEffect(() => {
        if (organizationObject === null && login) {
            dispatch(getOrganization(login));
        }
    }, [dispatch, login, organizationObject]);

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

    useEffect(() => {
        if (organization) {
            dispatch(getPortfolio(organization.repoQueries));
        }
    }, [organization, dispatch]);

    useEffect(() => {
        if (portfolioLoading) {
            dispatch(setMessageType('info'));
            dispatch(setMessage('Now Loading Portfolio'));
        }
    }, [portfolioLoading, dispatch]);

    useEffect(() => {
        if (portfolioObject) {
            setPortfolio(new Portfolio(portfolioObject));
        }
    }, [portfolioObject]);

    useEffect(() => {
        if (authenticatedUserObject === null) {
            dispatch(getAuthenticatedUserAccount());
        }
    }, [authenticatedUserObject]);

    return (
        <section className='organization' id='top'>
            <>
                {organization && <HeaderOrganizationComponent organization={organization} />}

                {organization && <ContactBar contactMethods={organization.contactMethods} location='' />}

                {
                    organization &&
                    projects.size > 0 &&
                    <ProjectsComponent projects={projects} />
                }

                <SkillsComponent skillsUsed={null} />
            </>
        </section>
    )
}

export default OrganizationPage