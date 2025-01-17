import React from 'react'

import Taxonomy from '@/model/Taxonomy'

import IconComponent from './IconComponent'

interface HeaderTaxonomyComponentProps {
    skill: Taxonomy
}

const HeaderTaxonomyComponent: React.FC<HeaderTaxonomyComponentProps> = ({ skill }) => {

    return (
        <>
            <h1 className="header-title">
                <IconComponent image={skill.image} />
                {skill.title}
            </h1>
        </>
    )
}

export default HeaderTaxonomyComponent