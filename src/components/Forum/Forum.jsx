import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core'
import _ from 'lodash';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import Navigation from '../Navigation/Navigation';
import SideNavigation from '../SideNavigation/SideNavigation';
import { sign_in } from '../../redux/authReducer';

import Overview from './Overview/Overview';
import Categories from './Categories/Categories';

const Forum = () => {

    const history = useHistory();

    const { profile } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { path } = useRouteMatch()

    useEffect(() => {
        if(!_.isEmpty(profile)){
            return
        }else if(localStorage.getItem('profile') !== null){
            dispatch(sign_in(JSON.parse(localStorage.getItem('profile'))));
        }else{
            history.push('/auth');
        }
    }, [dispatch])

    return (
        <div>
            <Navigation type="forum" />
            <Grid container>
                <Grid item md={3} xs={12}>
                    <SideNavigation />
                </Grid>
                <Grid item md={9} xs={12}>
                    <Switch>
                        <Route exact path={path}>
                            { profile.result?.accountType === 1 && <Overview /> }
                        </Route>

                        <Route path={`${path}/categories`}>
                            { profile.result?.accountType === 1 && <Categories /> }
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </div>
    )
}

export default Forum
