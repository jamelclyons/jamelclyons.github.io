import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';
import User from '@/model/User';

import { logout } from '@/controllers/authSlice';
import { setMessage, setMessageType, setShowStatusBar } from '@/controllers/messageSlice';

import { checkHeaders } from '@/utilities/Headers';

interface DashboardProps {
    user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!checkHeaders()) {
            navigate('/login');
        }
    }, []);

    const handleSkillAdd = () => {
        navigate('/admin/add/skill');
    };

    const handleUpdateProject = () => {
        navigate('/admin/update/portfolio');
    };

    const handleLogout = async () => {
        try {
            dispatch(logout());

            window.location.href = '/';
        } catch (error) {
            const err = error as Error;

            dispatch(setMessage(`Logout error: ${err.message}`));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(true));
        }
    };

    return (
        <section>
            <h2 className="title">Dashboard</h2>

            {/* Add info from read me file on use */}

            <div className="options">
                <button onClick={handleSkillAdd}>
                    <h3 className='title'>add skill</h3>
                </button>

                <button onClick={handleUpdateProject}>
                    <h3 className='title'>update projects</h3>
                </button>
            </div>

            <button onClick={handleLogout}>
                <h3 className='title'>logout</h3>
            </button>
        </section>
    )
}

export default Dashboard