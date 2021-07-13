import React from 'react'
import { NavLink } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer'

const Home = () => {
    return (
        <div>
            <Navigation type="" />
            <NavLink to="/forum">Forum</NavLink>

            <Footer />
        </div>
    )
}

export default Home
