import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/model/store';

import { setIsAdmin, setIsAuthenticated } from './controllers/loginSlice';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        isAuthenticated,
        isAdmin
    } = useSelector((state: RootState) => state.login);

    const [allowed, setAllowed] = useState<Boolean>();

    useEffect(() => {
        dispatch(setIsAuthenticated());
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(setIsAdmin());
        }
    }, [dispatch, isAuthenticated]);
console.log(isAdmin)
    useEffect(() => {
        if (isAdmin) {
            setAllowed(true);
        }
    }, [isAdmin]);

    return allowed ? (
        children
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;