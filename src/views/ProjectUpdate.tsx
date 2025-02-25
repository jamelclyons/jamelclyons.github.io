import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getProjectData } from '@/controllers/databaseSlice';
import { updateProject } from '@/controllers/updateSlice';
import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';

import UpdateDetails from './components/update/UpdateDetails';
import UpdateProcess from './components/update/process/UpdateProcess';
import UpdateSolution from './components/update/UpdateSolution';
import UpdateProblem from './components/update/UpdateProblem';
import StatusBarComponent from './components/StatusBarComponent';

import type { AppDispatch, RootState } from '@/model/store';
import Project, { ProjectObject } from '@/model/Project';
import Owner from '@/model/Owner';
import { ImageObject } from '@/model/Image';

const ProjectUpdate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { login, projectID } = useParams();

    const { updateLoading, updateLoadingMessage, updateErrorMessage, updateSuccessMessage, updateStatusCode } = useSelector(
        (state: RootState) => state.update
    );
    const { databaseLoading, databaseLoadingMessage, databaseStatusCode, databaseErrorMessage, projectDataObject } = useSelector(
        (state: RootState) => state.database
    );

    const [owner, setOwner] = useState<Owner>(new Owner({ login: login, name: 'Jamel C. Lyons' }));
    const [id, setId] = useState<string>();
    const [projectObject, setProjectObject] = useState<ProjectObject>({
        id: '',
        owner: {},
        title: '',
        description: '',
        solution: {
            gallery: {
                logos: projectDataObject?.solution?.gallery?.logos ?? [],
                icons: projectDataObject?.solution?.gallery?.icons ?? [],
                animations: projectDataObject?.solution?.gallery?.animations ?? [],
                uml_diagrams: projectDataObject?.solution?.gallery?.uml_diagrams ?? []
            },
            features: [],
            contentURL: '',
            currency: '',
            price: 0,
            urlsList: {
                homepage: {
                    name: '',
                    url: '',
                    image: {
                        id: '',
                        title: '',
                        url: '',
                        class_name: ''
                    }
                },
                ios: {
                    name: '',
                    url: '',
                    image: {
                        id: '',
                        title: '',
                        url: '',
                        class_name: ''
                    }
                },
                android: {
                    name: '',
                    url: '',
                    image: {
                        id: '',
                        title: '',
                        url: '',
                        class_name: ''
                    }
                }
            }
        },
        process: {
            status: {
                created_at: '',
                updated_at: '',
                progress: projectDataObject?.process?.status?.progress ?? '0'
            },
            design: {
                gallery: {
                    logos: [],
                    icons: [],
                    animations: [],
                    uml_diagrams: []
                },
                check_list: [],
                colors_list: [],
                content_url: ''
            },
            development: {
                repo_url: '',
                content_url: '',
                skills: {
                    types: [],
                    languages: [],
                    frameworks: [],
                    technologies: []
                },
                check_list: [],
                versions_list: {
                    current: '',
                    previous: []
                }
            },
            delivery: {
                check_list: [],
                gallery: {
                    logos: [],
                    icons: [],
                    animations: [],
                    uml_diagrams: []
                },
                content_url: ''
            }
        },
        problem: {
            contentURL: projectDataObject?.problem?.contentURL ?? '',
            gallery: {
                logos: projectDataObject?.problem?.gallery?.logos ?? [],
                icons: projectDataObject?.problem?.gallery?.icons ?? [],
                animations: projectDataObject?.problem?.gallery?.animations ?? [],
                uml_diagrams: projectDataObject?.problem?.gallery?.uml_diagrams ?? []
            }
        },
        details: {
            privacy: projectDataObject?.details?.privacy ?? 'public',
            client_id: projectDataObject?.details?.client_id ?? '0',
            client_name: projectDataObject?.details?.client_name ?? owner.name,
            start_date: projectDataObject?.details?.start_date ?? '',
            end_date: projectDataObject?.details?.end_date ?? '',
            content: '',
            team_list: []
        }
    });
    const [project, setProject] = useState<Project>(new Project(projectObject));
    const [updatedTitle, setUpdatedTitle] = useState<string>(projectID ?? '');

    useEffect(() => {
        if (projectID) {
            setId(projectID);
        }
    }, [dispatch, projectID]);

    useEffect(() => {
        if (id) {
            dispatch(getProjectData(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (databaseLoading && databaseLoadingMessage) {
            dispatch(setMessage(databaseLoadingMessage));
            dispatch(setMessageType('info'));
        }
    }, [databaseLoading, dispatch]);

    useEffect(() => {
        if (projectDataObject) {
            setProjectObject({
                id: projectDataObject?.id ?? '',
                owner: projectDataObject?.owner ?? {},
                title: projectDataObject?.title ?? '',
                description: projectDataObject?.description ?? '',
                solution: projectDataObject?.solution ?? {},
                process: {
                    status: {
                        created_at: '',
                        updated_at: '',
                        progress: projectDataObject?.process?.status?.progress ?? '0'
                    },
                    design: {
                        gallery: {
                            logos: [],
                            icons: [],
                            animations: [],
                            uml_diagrams: []
                        },
                        check_list: [],
                        colors_list: [],
                        content_url: ''
                    },
                    development: {
                        repo_url: '',
                        content_url: '',
                        skills: {
                            types: [],
                            languages: [],
                            frameworks: [],
                            technologies: []
                        },
                        check_list: [],
                        versions_list: {
                            current: '',
                            previous: []
                        }
                    },
                    delivery: {
                        check_list: [],
                        gallery: {
                            logos: [],
                            icons: [],
                            animations: [],
                            uml_diagrams: []
                        },
                        content_url: ''
                    }
                },
                problem: {
                    contentURL: projectDataObject?.problem?.contentURL ?? '',
                    gallery: {
                        logos: projectDataObject?.problem?.logos ?? [],
                        icons: projectDataObject?.problem?.icons ?? [],
                        animations: projectDataObject?.problem?.animations ?? [],
                        uml_diagrams: projectDataObject?.problem?.uml_diagrams ?? []
                    }
                },
                details: {
                    privacy: projectDataObject?.details?.privacy ?? 'public',
                    client_id: projectDataObject?.details?.client_id ?? '0',
                    client_name: projectDataObject?.details?.client_name ?? owner.name,
                    start_date: projectDataObject?.details?.start_date ?? '',
                    end_date: projectDataObject?.details?.end_date ?? '',
                    content: '',
                    team_list: []
                }
            });
        }
    }, [projectDataObject, setProjectObject]);

    useEffect(() => {
        if (projectObject) {
            setProject(new Project(projectObject));
        }
    }, [projectObject, setProject]);

    useEffect(() => {
        if (databaseErrorMessage) {
            dispatch(setMessageType('error'));
            dispatch(setMessage(databaseErrorMessage));
            dispatch(setShowStatusBar(Date.now));
        }
    }, [dispatch, databaseErrorMessage]);

    useEffect(() => {
        if (updateLoading && updateLoadingMessage) {
            dispatch(setMessage(updateLoadingMessage));
            dispatch(setMessageType('info'));
        }
    }, [updateLoading, dispatch]);

    useEffect(() => {
        if (updateErrorMessage) {
            dispatch(setMessage(updateErrorMessage));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));

        }
    }, [updateErrorMessage, dispatch]);

    useEffect(() => {
        if (updateSuccessMessage) {
            dispatch(setMessage(updateSuccessMessage));
            dispatch(setMessageType('success'));
            dispatch(setShowStatusBar(Date.now()));
        }
    }, [updateSuccessMessage, dispatch]);

    useEffect(() => {
        if (updateStatusCode === 403 || databaseStatusCode === 403) {
            navigate('/login');
        }
    }, [updateStatusCode]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target as HTMLInputElement;

            const { name, value } = target;

            if (name === 'title') {
                setUpdatedTitle(value);
            }

            const updatedProjectObject: ProjectObject = {
                ...projectObject,
                title: updatedTitle
            }

            setProject(new Project(updatedProjectObject))
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    const handleUpdateProject = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            dispatch(updateProject(project));
        } catch (error) {
            const err = error as Error;
            dispatch(setMessageType('error'));
            dispatch(setMessage(err.message));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    return (
        <section className='update-project'>
            <h1 className='title'>update project</h1>

            <form action="" id="add_project">
                <div className="form-item-flex">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={updatedTitle}
                        onChange={handleChange}
                    />
                </div>

                <button onClick={handleUpdateProject}>
                    <h3>Update Title</h3>
                </button>
            </form>

            <hr />

            {projectID && projectDataObject && <UpdateSolution projectObject={projectObject} />}

            <hr />

            {projectID && projectDataObject && <UpdateProcess projectObject={projectObject} />}

            <hr />

            {projectID && projectDataObject && <UpdateProblem projectObject={projectObject} />}

            <hr />
            
            {projectID && projectDataObject && <UpdateDetails projectObject={projectObject} />}

            <StatusBarComponent />
        </section>
    )
}

export default ProjectUpdate