import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import Navigation from '../Navigation/Navigation';
import { sign_in } from '../../redux/authReducer';

const Forum = () => {

    const history = useHistory();

    const { profile } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!_.isEmpty(profile)){
            return
        }else if(localStorage.getItem('profile') !== null){
            console.log()
            dispatch(sign_in(JSON.parse(localStorage.getItem('profile'))));
        }else{
            history.push('/auth');
        }
    }, [])

    return (
        <div>
            <Navigation type="forum" />
        </div>
    )
}

export default Forum
