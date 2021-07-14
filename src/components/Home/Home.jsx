import React from 'react'

import Navigation from '../Navigation/Navigation';
import TopBg from '../TopBg';
import Slideshow from './Slider/Slideshow';
import CoursesOffered from './CoursesOffered';
import BackToTop from '../Globals/BackToTop';

const Home = () => {
    return (
        <div>
            <BackToTop />
            <TopBg />
            <Navigation type="" />
            <Slideshow />
            <CoursesOffered />
        </div>
    )
}

export default Home
