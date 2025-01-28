import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { RootState } from '../model/store';

import { auth } from '@/services/firebase/config';

import LoginComponent from './components/LoginComponent';
import { setIsAdmin, setIsAuthenticated } from '@/controllers/authSlice';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const { isAdmin, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log(user)
            if (user) {
                setIsAuthenticated();
                setIsAdmin();
            } else {


                console.log('User logged out');
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isAuthenticated && isAdmin) {
            navigate('/admin/dashboard');
        }
    }, [navigate, isAuthenticated, isAdmin]);

    return (
        <section className='login'>
            <main>
                <LoginComponent />
            </main>
        </section>
    )
}

export default LoginPage