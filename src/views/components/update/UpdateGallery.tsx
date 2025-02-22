import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/model/store';

import Gallery from '@/model/Gallery'
import Image from '@/model/Image';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateGallery } from '@/controllers/updateSlice';

interface UpdateGalleryProps {
    gallery: Gallery;
}

const UpdateGallery: React.FC<UpdateGalleryProps> = ({ gallery }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [logos, setLogos] = useState<Array<Image>>(gallery.logos);
    const [icons, setIcons] = useState(gallery.icons ?? []);
    const [animations, setAnimations] = useState(gallery.animations ?? []);
    const [umlDiagrams, setUmlDiagrams] = useState(gallery.umlDiagrams ?? []);

    const [newLogo, setNewLogo] = useState({ title: '', url: '', class_name: '' });
    const [newIcon, setNewIcon] = useState({ title: '', url: '', class_name: '' });
    const [newAnimation, setNewAnimation] = useState({ title: '', url: '', class_name: '' });
    const [newUmlDiagram, setNewUmlDiagram] = useState({ title: '', url: '', class_name: '' });

    const handleNewLogo = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewLogo((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNewLogo = () => {
        if (newLogo.title && (newLogo.url || newLogo.class_name)) {
            setLogos((prev: Array<Image>) => [...prev, new Image({ id: Date.now().toString(), ...newLogo })]);
            setNewLogo({ title: '', url: '', class_name: '' });
        };
    }

    const handleNewIcon = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewIcon((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNewIcon = () => {
        if (newIcon.title && (newIcon.url || newIcon.class_name)) {
            setIcons((prev: Array<Image>) => [...prev, new Image({ id: Date.now().toString(), ...newIcon })]);
            setNewIcon({ title: '', url: '', class_name: '' });
        };
    }

    const handleNewAnimation = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAnimation((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNewAnimation = () => {
        if (newAnimation.title && (newAnimation.url || newAnimation.class_name)) {
            setAnimations((prev: Array<Image>) => [...prev, new Image({ id: Date.now().toString(), ...newAnimation })]);
            setNewAnimation({ title: '', url: '', class_name: '' });
        };
    }

    const handleNewUmlDiagram = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUmlDiagram((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNewUmlDiagram = () => {
        if (newUmlDiagram.title && (newUmlDiagram.url || newUmlDiagram.class_name)) {
            setUmlDiagrams((prev: Array<Image>) => [...prev, new Image({ id: Date.now().toString(), ...newUmlDiagram })]);
            setNewUmlDiagram({ title: '', url: '', class_name: '' });
        };
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        state: any[],
        setState: React.Dispatch<React.SetStateAction<any[]>>
    ) => {
        const { name, value, dataset } = e.target;
        const index = dataset.index ? parseInt(dataset.index, 10) : -1;

        if (index === -1) return;

        const updatedState = [...state];
        updatedState[index] = { ...updatedState[index], [name]: value };

        setState(updatedState);
    };

    const handleUpdateProblem = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const galleryObject = {
                logos: logos.map((logo) => logo.toObject()),
                icons: icons.map((icon) => icon.toObject()),
                animations: animations.map((animation) => animation.toObject()),
                uml_diagrams: umlDiagrams.map((umlDiagram) => umlDiagram.toObject())
            };

            const updatedGallery = new Gallery(galleryObject)

            dispatch(updateGallery(updatedGallery));
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    return (
        <div className='update'>

            <form onSubmit={(e) => e.preventDefault()} id='update_gallery_logos'>
                {Array.isArray(logos) && logos.length > 0 && (
                    <>
                        <h3>Logos</h3>

                        {logos.map((item: Image, index: number) => (
                            <div className="form-item" key={item.id}>
                                <input
                                    type="text"
                                    placeholder="ID"
                                    value={item.id ?? ""}
                                    name="id"
                                    disabled
                                />
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={item.title ?? ""}
                                    name="title"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, logos, setLogos)}
                                />
                                <input
                                    type="text"
                                    placeholder="URL"
                                    value={item.url ?? ""}
                                    name="url"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, logos, setLogos)}
                                />
                                <input
                                    type="text"
                                    placeholder="Class Name"
                                    value={item.className ?? ""}
                                    name="class_name"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, logos, setLogos)}
                                />
                            </div>
                        ))}
                    </>
                )}

                <hr />

                <h4>Add New Logo</h4>

                <div className='form-item'>
                    <input type="text" name="title" placeholder="Title" value={newLogo.title} onChange={handleNewLogo} />
                    <input type="text" name="url" placeholder="URL" value={newLogo.url} onChange={handleNewLogo} />
                    <input type="text" name="class_name" placeholder="Class Name" value={newLogo.class_name} onChange={handleNewLogo} />
                    <button type="button" onClick={handleAddNewLogo}><h3>Add Logo</h3></button>
                </div>

                <button type="button" onClick={handleUpdateProblem}>
                    <h3>Update Logos</h3>
                </button>
            </form>

            <form onSubmit={(e) => e.preventDefault()} id='update_gallery_icons'>
                {Array.isArray(icons) && icons.length > 0 && (
                    <>
                        <h3>Icons</h3>

                        {icons.map((item: Image, index: number) => (
                            <div className="form-item" key={item.id}>
                                <input
                                    type="text"
                                    placeholder="ID"
                                    value={item.id ?? ""}
                                    name="id"
                                    disabled
                                />
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={item.title ?? ""}
                                    name="title"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, icons, setIcons)}
                                />
                                <input
                                    type="text"
                                    placeholder="URL"
                                    value={item.url ?? ""}
                                    name="url"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, icons, setIcons)}
                                />
                                <input
                                    type="text"
                                    placeholder="Class Name"
                                    value={item.className ?? ""}
                                    name="class_name"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, icons, setIcons)}
                                />
                            </div>
                        ))}
                    </>
                )}

                <hr />

                <h4>Add New Icon</h4>

                <div className='form-item'>
                    <input type="text" name="title" placeholder="Title" value={newIcon.title} onChange={handleNewIcon} />
                    <input type="text" name="url" placeholder="URL" value={newIcon.url} onChange={handleNewIcon} />
                    <input type="text" name="class_name" placeholder="Class Name" value={newIcon.class_name} onChange={handleNewIcon} />
                    <button type="button" onClick={handleAddNewIcon}><h3>Add Icon</h3></button>
                </div>

                <button type="button" onClick={handleUpdateProblem}>
                    <h3>Update Icons</h3>
                </button>
            </form>

            <form onSubmit={(e) => e.preventDefault()} id='update_gallery_animations'>
                {Array.isArray(animations) && animations.length > 0 && (
                    <>
                        <h3>Animations</h3>

                        {animations.map((item: Image, index: number) => (
                            <div className="form-item" key={item.id}>
                                <input
                                    type="text"
                                    placeholder="ID"
                                    value={item.id ?? ""}
                                    name="id"
                                    disabled
                                />
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={item.title ?? ""}
                                    name="title"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, animations, setAnimations)}
                                />
                                <input
                                    type="text"
                                    placeholder="URL"
                                    value={item.url ?? ""}
                                    name="url"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, animations, setAnimations)}
                                />
                                <input
                                    type="text"
                                    placeholder="Class Name"
                                    value={item.className ?? ""}
                                    name="class_name"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, animations, setAnimations)}
                                />
                            </div>
                        ))}
                    </>
                )}

                <hr />

                <h4>Add New Animation</h4>

                <div className='form-item'>
                    <input type="text" name="title" placeholder="Title" value={newAnimation.title} onChange={handleNewAnimation} />
                    <input type="text" name="url" placeholder="URL" value={newAnimation.url} onChange={handleNewAnimation} />
                    <input type="text" name="class_name" placeholder="Class Name" value={newAnimation.class_name} onChange={handleNewAnimation} />
                    <button type="button" onClick={handleAddNewAnimation}><h3>Add Animation</h3></button>
                </div>

                <button type="button" onClick={handleUpdateProblem}>
                    <h3>Update Animations</h3>
                </button>
            </form>

            <form onSubmit={(e) => e.preventDefault()} id='update_gallery_uml_diagrams'>
                {Array.isArray(umlDiagrams) && umlDiagrams.length > 0 && (
                    <>
                        <h3>UML Diagrams</h3>

                        {umlDiagrams.map((item: Image, index: number) => (
                            <div className="form-item" key={item.id}>
                                <input
                                    type="text"
                                    placeholder="ID"
                                    value={item.id ?? ""}
                                    name="id"
                                    disabled
                                />
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={item.title ?? ""}
                                    name="title"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, umlDiagrams, setUmlDiagrams)}
                                />
                                <input
                                    type="text"
                                    placeholder="URL"
                                    value={item.url ?? ""}
                                    name="url"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, umlDiagrams, setUmlDiagrams)}
                                />
                                <input
                                    type="text"
                                    placeholder="Class Name"
                                    value={item.className ?? ""}
                                    name="class_name"
                                    data-index={index}
                                    onChange={(e) => handleChange(e, umlDiagrams, setUmlDiagrams)}
                                />
                            </div>
                        ))}
                    </>
                )}

                <hr />

                <h4>Add New UML Diagram</h4>

                <div className='form-item'>
                    <input type="text" name="title" placeholder="Title" value={newUmlDiagram.title} onChange={handleNewUmlDiagram} />
                    <input type="text" name="url" placeholder="URL" value={newUmlDiagram.url} onChange={handleNewUmlDiagram} />
                    <input type="text" name="class_name" placeholder="Class Name" value={newUmlDiagram.class_name} onChange={handleNewUmlDiagram} />
                    <button type="button" onClick={handleAddNewUmlDiagram}><h3>Add UML Diagram</h3></button>
                </div>

                <button type="button" onClick={handleUpdateProblem}>
                    <h3>Update UML Diagrams</h3>
                </button>
            </form>
        </div>
    )
}

export default UpdateGallery;