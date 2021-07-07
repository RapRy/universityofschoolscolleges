import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core'
import _ from 'lodash';
import { Switch, Route, useRouteMatch, useHistory, Redirect } from 'react-router-dom'

import Navigation from '../Navigation/Navigation';
import SideNavigation from '../SideNavigation/SideNavigation';
import { sign_in_LS } from '../../redux/authReducer';

import Overview from './Overview/Overview';
import Categories from './Categories/Categories';
import Empty from '../Globals/Empty/Empty'
import Topics from './Topics/Topics';
import Topic from './Topics/Topic'
import ActiveUsersList from './Users/ActiveUsersList';
import RegisteredUsersList from './Users/RegisteredUsersList';

const Forum = () => {
    const profileLS = JSON.parse(localStorage.getItem('profile'))

    const history = useHistory();

    const { profile } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { path } = useRouteMatch()

    useEffect(() => {
        if(!_.isEmpty(profile)){
            return
        }else if(localStorage.getItem('profile') !== null){
            dispatch(sign_in_LS(profileLS));
        }else{
            history.push('/auth');
        }

    }, [dispatch, profile])

    return (
        <div>
            <Navigation type="forum" />
            <Grid container>
                <Grid item md={3} xs={12}>
                    <SideNavigation />
                </Grid>
                <Grid item md={9} xs={12}>
                    {/* <Empty message="No Topics fro this category" /> */}
                    <Switch>
                        <Route exact path={path} >
                            { ((profile?.result?.accountType === 1 && profile?.result !== null) || (profileLS?.result?.accountType === 1 && profileLS?.result !== null)) ? <Overview /> : <Redirect to={`${path}/topics`} />}
                        </Route>

                        <Route path={`${path}/categories`}>
                            { profile.result?.accountType === 1 && <Categories /> }
                        </Route>

                        <Route exact path={`${path}/active-users`} component={ActiveUsersList} />
                        <Route exact path={`${path}/registered-users`} component={RegisteredUsersList} />

                        <Route exact path={`${path}/:category`} component={Topics} />

                        <Route exact path={`${path}/:category/:topicId`} component={Topic} />

                    </Switch>
                </Grid>
            </Grid>
        </div>
    )
}

export default Forum
