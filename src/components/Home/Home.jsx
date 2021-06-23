import React from 'react'
import { NavLink } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

const Home = () => {
    return (
        <div>
            <Navigation type="" />
            <NavLink to="/forum">Forum</NavLink>
        </div>
    )
}

export default Home
