import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { useParams, Redirect } from 'react-router-dom';
import ProfilePage from '../profile';
import EditUserPage from '../users/users-edit';

const ProfileGuard = ( { path } ) => {
    const context = useContext(UserContext);
    const params = useParams();

    const correctUserIsLogged = context.user && context.user.loggedIn && context.user.id === params.id;

    if (!correctUserIsLogged) {
        return <Redirect to="/" />
    }

    if (path === 'details') {
        return (<ProfilePage />);
    } else if (path === 'edit') {
        return (<EditUserPage />);
    }
}

export default ProfileGuard;