import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/model/store';
import ProjectStatus, { ProjectStatusObject } from '@/model/ProjectStatus';
import Project from '@/model/Project';
import CheckList from '@/model/CheckList';

import ProjectProgress from '@/model/ProjectProgress';
import ProjectCheckList from '@/model/ProjectCheckList';

import Status from '../../project/Status';

interface UpdateStatusProps {
    project: Project;
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ project }) => {
    const { updatedDesignCheckList, updatedDevelopmentCheckList, updatedDeliveryCheckList } = useSelector(
        (state: RootState) => state.update
    );

    const [designCheckList, setDesignCheckList] = useState<CheckList>(project.process.design.checkList)
    const [developmentCheckList, setDevelopmentCheckList] = useState<CheckList>(project.process.development.checkList)
    const [deliveryCheckList, setDeliveryCheckList] = useState<CheckList>(new CheckList(project.process.delivery.checkList))
    const [checkList, setCheckList] = useState<ProjectCheckList>(new ProjectCheckList(
        {
            design_check_list: project.process.design.checkList.toCheckListObject(),
            development_check_list: project.process.development.checkList.toCheckListObject(),
            delivery_check_list: project.process.delivery.checkList.toCheckListObject()
        }
    ));
    const [progress, setProgress] = useState<ProjectProgress>(project.process.status.progress);
    const [projectStatus, setProjectStatus] = useState<ProjectStatus>(project.process.status);

    useEffect(() => {
        if (project.process.design.checkList) {
            setDesignCheckList(project.process.design.checkList)
        }
    }, [project.process.design.checkList, setDesignCheckList]);

    useEffect(() => {
        if (project.process.development.checkList) {
            setDevelopmentCheckList(project.process.development.checkList)
        }
    }, [project.process.development.checkList, setDevelopmentCheckList]);

    useEffect(() => {
        if (project.process.delivery.checkList) {
            setDeliveryCheckList(project.process.delivery.checkList)
        }
    }, [project.process.delivery.checkList, setDeliveryCheckList]);

    useEffect(() => {
        setProgress(project.process.status.progress);
    }, [project.process.status.progress, setProgress]);

    useEffect(() => {
        setProjectStatus(project.process.status);
    }, [project.process.status, setProjectStatus]);

    useEffect(() => {
        if (updatedDesignCheckList) {
            setDesignCheckList(new CheckList(updatedDesignCheckList))
        }
    }, [updatedDesignCheckList, setDesignCheckList]);

    useEffect(() => {
        if (updatedDevelopmentCheckList) {
            setDevelopmentCheckList(new CheckList(updatedDevelopmentCheckList))
        }
    }, [updatedDevelopmentCheckList, setDevelopmentCheckList]);

    useEffect(() => {
        if (updatedDeliveryCheckList) {
            setDeliveryCheckList(new CheckList(updatedDeliveryCheckList))
        }
    }, [updatedDeliveryCheckList, setDeliveryCheckList]);

    useEffect(() => {
        setCheckList(new ProjectCheckList(
            {
                design_check_list: designCheckList.toCheckListObject(),
                development_check_list: developmentCheckList.toCheckListObject(),
                delivery_check_list: deliveryCheckList.toCheckListObject()
            }
        ))
    }, [designCheckList, developmentCheckList, deliveryCheckList, setCheckList]);

    useEffect(() => {
        setProgress(new ProjectProgress(checkList));
    }, [checkList, setProgress]);

    useEffect(() => {
        if (progress) {
            const projectStatusObject: ProjectStatusObject = {
                created_at: project.process.status.createdAt,
                updated_at: project.process.status.updatedAt
            }

            setProjectStatus(new ProjectStatus(projectStatusObject, progress));
        }
    }, [progress, setProjectStatus]);

    return (
        <>
            {projectStatus && <Status projectStatus={projectStatus} />}
        </>
    )
}

export default UpdateStatus