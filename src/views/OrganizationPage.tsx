import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import PortfolioComponent from './components/portfolio/PortfolioComponent';
import OrganizationComponent from './components/OrganizationComponent';
import ContactBar from './components/ContactBar';

import { getOrganization } from '@/controllers/organizationSlice';

import type { AppDispatch, RootState } from '@/model/store';
import Organization from '@/model/Organization';

const OrganizationPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { login } = useParams<string>();

    const { organizationObject } = useSelector(
        (state: RootState) => state.organization);

    const [organization, setOrganization] = useState<Organization>();

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

    return (
        <section className='organization' id='top'>
            <>
                {organization && <OrganizationComponent organization={organization} />}

                {organization && <ContactBar contactMethods={organization.contactMethods} location='' />}

                {organization && <PortfolioComponent account={organization}/>}
            </>
        </section>
    )
}

export default OrganizationPage