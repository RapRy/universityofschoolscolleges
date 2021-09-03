import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import MainHeader from "../../Globals/MainHeader";
import Event from "../../Globals/Events/Event";
import "./customCss.css";

const events = [
  {
    img: "event1.jpg",
    date: {
      month: "June",
      day: 16,
      year: 2021,
      startTime: "8:00 am",
      lastTime: "12:30 pm",
    },
    title: "Event Name 2021",
    location: "Event 1 Venue",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis iaculis lectus odio orci elit tempor urna eget. Ipsum, viverra lobortis tortor metus amet tellus dignissim nis.",
  },
  {
    img: "event2.jpg",
    date: {
      month: "July",
      day: 22,
      year: 2021,
      startTime: "9:00 am",
      lastTime: "2:30 pm",
    },
    title: "Event Name 2021",
    location: "Event 2 Venue",
    description:
      "Felis iaculis lectus odio orci elit tempor urna eget. Ipsum, viverra lobortis tortor metus amet tellus dignissim nis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  },
  {
    img: "event1.jpg",
    date: {
      month: "June",
      day: 19,
      year: 2021,
      startTime: "8:00 am",
      lastTime: "12:30 pm",
    },
    title: "Event Name 2021",
    location: "Event 3 Venue",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis iaculis lectus odio orci elit tempor urna eget. Ipsum, viverra lobortis tortor metus amet tellus dignissim nis.",
  },
  {
    img: "event2.jpg",
    date: {
      month: "June",
      day: 18,
      year: 2021,
      startTime: "8:00 am",
      lastTime: "12:30 pm",
    },
    title: "Event Name 2021",
    location: "Event 4 Venue",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis iaculis lectus odio orci elit tempor urna eget. Ipsum, viverra lobortis tortor metus amet tellus dignissim nis.",
  },
  {
    img: "event1.jpg",
    date: {
      month: "June",
      day: 25,
      year: 2021,
      startTime: "8:00 am",
      lastTime: "12:30 pm",
    },
    title: "Event Name 2021",
    location: "Event 5 Venue",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis iaculis lectus odio orci elit tempor urna eget. Ipsum, viverra lobortis tortor metus amet tellus dignissim nis.",
  },
  {
    img: "event2.jpg",
    date: {
      month: "June",
      day: 28,
      year: 2021,
      startTime: "8:00 am",
      lastTime: "12:30 pm",
    },
    title: "Event Name 2021",
    location: "Event 6 Venue",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis iaculis lectus odio orci elit tempor urna eget. Ipsum, viverra lobortis tortor metus amet tellus dignissim nis.",
  },
  {
    img: "event1.jpg",
    date: {
      month: "June",
      day: 30,
      year: 2021,
      startTime: "8:00 am",
      lastTime: "12:30 pm",
    },
    title: "Event Name 2021",
    location: "Event 7 Venue",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis iaculis lectus odio orci elit tempor urna eget. Ipsum, viverra lobortis tortor metus amet tellus dignissim nis.",
  },
];

const ArrowNext = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ChevronRightIcon style={{ fontSize: "3rem" }} />
    </div>
  );
};

const ArrowPrev = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ChevronLeftIcon style={{ fontSize: "3rem" }} />
    </div>
  );
};

const UpcomingEvents = () => {
  const classes = useStyles();
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    swipeToSlide: true,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Container className={classes.mainContainer}>
      <MainHeader heading="upcoming events" cta="view all" />
      <Slider {...slickSettings}>
        {events.map((event, i) => (
          <Event key={i} event={event} />
        ))}
      </Slider>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: theme.spacing(24),
  },
}));

export default UpcomingEvents;
