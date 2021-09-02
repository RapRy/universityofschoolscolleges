import React from "react";
import {
  Typography,
  Grid,
  Box,
  makeStyles,
  useTheme,
  ThemeProvider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import { PillButton } from "../Buttons";
import { poppinsFont, ubuntuFont } from "../../../theme/themes";

const Event = ({ event }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box position="relative" padding={theme.spacing(0, 4)}>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        spacing={4}
        className={`${classes.gridContainer} ${classes.padding}`}
      >
        <Grid item xs={2}>
          <img
            className={classes.calIcon}
            src={`${process.env.PUBLIC_URL}/assets/calendar-icon.svg`}
            alt="Calendar Icon"
          />
        </Grid>
        <Grid item xs={10}>
          <Link to="/">
            <img
              className={classes.img}
              src={`${process.env.PUBLIC_URL}/assets/${event.img}`}
              alt={event.title}
            />
          </Link>
        </Grid>
      </Grid>
      <div>
        <ThemeProvider theme={poppinsFont}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              className={`${classes.date} ${classes.padding}`}
              variant="h5"
            >{`${event.date.day} ${event.date.month} ${event.date.year}`}</Typography>
            <Typography
              className={`${classes.title} ${classes.padding}`}
              variant="h5"
            >
              {event.title}
            </Typography>
          </Link>
        </ThemeProvider>
        <ThemeProvider theme={ubuntuFont}>
          <div className={`${classes.timeVenueContainer} ${classes.padding}`}>
            <Typography variant="body1" className={classes.timeVenueData}>
              <AccessTimeIcon className={classes.icon} />{" "}
              {`${event.date.startTime} - ${event.date.lastTime}`}
            </Typography>
            <Typography variant="body1" className={classes.timeVenueData}>
              <LocationOnIcon className={classes.icon} /> {event.location}
            </Typography>
          </div>
          <Typography
            className={`${classes.snippet} ${classes.padding}`}
            variant="body1"
          >
            {event.description}
          </Typography>
        </ThemeProvider>
        <Box padding={theme.spacing(0, 2)}>
          <PillButton
            text="more details"
            bgColor={theme.palette.primary.light}
            bgColorHover={theme.palette.primary.main}
            textColor={theme.palette.common.white}
            padding={theme.spacing(2, 3)}
            isFullWidth={true}
          />
        </Box>
      </div>
      <Box
        position="absolute"
        top="110px"
        left="5%"
        bgcolor={theme.palette.background.default}
        width="90%"
        height="72%"
        zIndex="-1"
        borderRadius={theme.spacing(2)}
      ></Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(0, 1),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0, 2),
    },
  },
  gridContainer: {
    marginBottom: theme.spacing(2),
  },
  calIcon: {
    marginBottom: theme.spacing(1),
  },
  img: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    width: "100%",
    transform:
      "perspective(0px) rotateY(0deg) rotateZ(0deg) rotateX(0deg) scale(1)",
    transition: "transform 1s ease 0s",
    "&:hover": {
      transform:
        "perspective(800px) rotateY(-8deg) rotate(1deg) rotateX(10deg) scale(.96)",
    },
  },
  date: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "1.4rem",
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.black,
    marginBottom: theme.spacing(2),
  },
  timeVenueContainer: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    color: theme.palette.common.black,
    fontSize: ".9rem",
    transform: "translateY(2px)",
    marginRight: "3px",
  },
  timeVenueData: {
    display: "inline-block",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.black,
    fontSize: ".8rem",
    "&:first-child": {
      marginRight: theme.spacing(2),
    },
  },
  snippet: {
    color: theme.palette.common.black,
    fontSize: ".8rem",
    lineHeight: 1.9,
    marginBottom: theme.spacing(3),
    wordWrap: "break-word",
  },
}));

export default Event;
