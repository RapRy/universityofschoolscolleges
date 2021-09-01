import React from "react";

import Navigation from "../Navigation/Navigation";
import LandingPage from "./LandingPage";
import CoursesOffered from "./CoursesOffered";
import BackToTop from "../Globals/BackToTop";
import UpcomingEvents from "./UpcomingEvents";
import FromForum from "./FromForum";

const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <BackToTop />
      <Navigation type="" />
      <LandingPage />
      <CoursesOffered />
      <UpcomingEvents />
      <FromForum />
    </div>
  );
};

export default Home;
