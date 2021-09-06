import React, { useRef, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  useMediaQuery,
  makeStyles,
  ThemeProvider,
  useTheme,
} from "@material-ui/core";

import MainHeader from "../Globals/MainHeader";

import { PillButton } from "../Globals/Buttons";
import { poppinsFont } from "../../theme/themes";

const CoursesOffered = () => {
  const max960 = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const max600 = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const imgRef = useRef(null);
  const theme = useTheme();
  const [topPos, setTopPos] = useState(theme.spacing(28));
  const classes = useStyles({ topPos });

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      if (e.target.innerWidth < 900) {
        setTopPos(imgRef.current.height - 220);
      }
    });

    max600 && setTopPos(theme.spacing(24));
  }, [theme, max600]);

  return (
    <Container className={classes.mainContainer}>
      <Grid container direction={max960 ? "column-reverse" : "row"} spacing={2}>
        <Grid item xs={12} md={5} className={classes.marginTop}>
          <MainHeader heading="courses offered" cta="" />
          <ThemeProvider theme={poppinsFont}>
            <Typography variant="body1" className={classes.paragh}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
              faucibus nec sed faucibus egestas etiam dapibus tortor. Proin
              adipiscing pharetra, mattis adipiscing eget placerat dignissim
              ipsum. Sed proin ac ut amet aenean nunc metus. Neque consectetur
              donec phasellus risus elementum sollicitudin vestibulum malesuada
              pellentesque.
            </Typography>
          </ThemeProvider>
          <Box marginTop="32px">
            <Box marginRight="20px" marginBottom="20px" display="inline-block">
              <PillButton
                text="List of Courses"
                bgColor={theme.palette.primary.light}
                bgColorHover={theme.palette.primary.main}
                textColor={theme.palette.common.white}
                padding={theme.spacing(1, 4)}
                isFullWidth={false}
                eventHandler={null}
                type="button"
              />
            </Box>
            <PillButton
              text="Learn How to apply"
              bgColor={theme.palette.secondary.light}
              bgColorHover={theme.palette.secondary.main}
              textColor={theme.palette.common.white}
              padding={theme.spacing(1, 4)}
              isFullWidth={false}
              eventHandler={null}
              type="button"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={7} className={classes.posRelative}>
          <img
            className={classes.img}
            src={`${process.env.PUBLIC_URL}/assets/courses.png`}
            alt="courses"
            ref={imgRef}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: theme.spacing(10),
  },
  paragh: {
    textAlign: "justify",
    color: theme.palette.common.black,
    fontSize: ".8rem",
    lineHeight: "1.8",
  },
  posRelative: {
    position: "relative",
  },
  img: {
    position: "absolute",
    right: "-100px",
    top: "-240px",
    width: "100%",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      right: "0%",
      left: "-100px",
    },
    [theme.breakpoints.down("xs")]: {
      top: "-190px",
      left: "0%",
    },
  },
  marginTop: {
    [theme.breakpoints.down("sm")]: {
      marginTop: (props) => `${props.topPos}px`,
    },
  },
}));

export default CoursesOffered;
