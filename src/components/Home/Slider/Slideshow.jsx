import React from "react";
import { Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Slider from "react-animated-slider";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "react-animated-slider/build/horizontal.css";

import "./slider.css";

// TODO delete me

const slides = [
  {
    image: `${process.env.PUBLIC_URL}/assets/slide1.jpg`,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    snippets:
      "Mauris quis justo dui. Phasellus posuere porta ante. Phasellus eu pretium justo. In gravida, tortor in semper consectetur, nulla elit tempor arcu, non accumsan nisi dui convallis mi. Pellentesque vitae lacus posuere, vestibulum metus sed, aliquam sapien. Maecenas et feugiat eros.",
    link: "/forum",
  },
  {
    image: `${process.env.PUBLIC_URL}/assets/slide2.jpg`,
    title: "Lorem ipsum dolor sit amet",
    snippets:
      "Mauris quis justo dui. Phasellus posuere porta ante. Phasellus eu pretium justo. In gravida, tortor in semper consectetur, nulla elit tempor arcu, non accumsan nisi dui convallis mi. Pellentesque vitae lacus posuere, vestibulum metus sed.",
    link: "/forum",
  },
  {
    image: `${process.env.PUBLIC_URL}/assets/slide3.jpg`,
    title: "Phasellus posuere porta ante. Phasellus eu pretium justo",
    snippets:
      "Maecenas et feugiat eros. Pellentesque sed fermentum sapien, eu sagittis arcu. Morbi vestibulum massa quis cursus viverra. In id massa nec metus molestie luctus vel eu libero. Quisque non leo id nisl efficitur ullamcorper sit amet pretium tellus.",
    link: "/forum",
  },
];

const Slideshow = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <Slider
        className="slider"
        duration={2000}
        autoplay={5000}
        nextButton={<ArrowForwardIosIcon className={classes.arrowIcon} />}
        previousButton={<ArrowBackIosIcon className={classes.arrowIcon} />}
      >
        {slides.map((slide, i) => (
          <div key={i}>
            <img className={classes.img} src={slide.image} alt={i} />
            <div className={`${classes.detailsContainer} inner`}>
              <Typography variant="h6" className={classes.heading}>
                {slide.title}
              </Typography>
              <Typography variant="body1" className={classes.snippet}>
                {slide.snippets}
              </Typography>
              <Link to={slide.link} className={classes.link}>
                more details
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: "relative",
    marginTop: theme.spacing(4),
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  detailsContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 5,
    background: "rgba(0,0,0,.7)",
    padding: theme.spacing(2, 4),
    transform: "translateY(200px)",
    opacity: 0,
    transition: "opacity 2000ms, transform 1500ms",
  },
  heading: {
    color: theme.palette.secondary.contrastText,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: ".95rem",
    marginBottom: theme.spacing(1),
  },
  snippet: {
    color: theme.palette.primary.contrastText,
    fontSize: ".85rem",
    marginBottom: theme.spacing(2),
    lineHeight: "1.8",
  },
  link: {
    color: theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    fontSize: ".85rem",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  arrowIcon: {
    color: theme.palette.secondary.contrastText,
    opacity: ".5",
  },
}));

export default Slideshow;
