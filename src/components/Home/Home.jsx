import React from 'react'

import Navigation from '../Navigation/Navigation';
import TopBg from '../TopBg';
import Slideshow from './Slider/Slideshow';
import CoursesOffered from './CoursesOffered';
import BackToTop from '../Globals/BackToTop';
import UpcomingEvents from './UpcomingEvents';
import FromForum from './FromForum';

const Home = () => {
    return (
        <div>
            <BackToTop />
            <TopBg />
            <Navigation type="" />
            <Slideshow />
            <CoursesOffered />
            <UpcomingEvents />
            <FromForum />
        </div>
    )
}

export default Home
