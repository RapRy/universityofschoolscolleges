import {
  Box,
  makeStyles,
  Container,
  Typography,
  ThemeProvider,
  useTheme,
} from "@material-ui/core";
import React from "react";

import { ubuntuFont, poppinsFont } from "../../theme/themes";
import { PillButton } from "../Globals/Buttons";

const LandingPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box
      width="100%"
      height="700px"
      bgcolor="primary"
      style={{
        background: `url(${process.env.PUBLIC_URL}/assets/landing-bg.jpg) center top no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <Container className={classes.container}>
        <div className={classes.maxWidth}>
          <ThemeProvider theme={ubuntuFont}>
            <Typography variant="h5" className={classes.headerH5}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit
            </Typography>
          </ThemeProvider>
        </div>
        <div className={classes.maxWidth}>
          <ThemeProvider theme={poppinsFont}>
            <Typography variant="body1" className={classes.bodyText}>
              Mauris quis justo dui. Phasellus posuere porta ante. Phasellus eu
              pretium justo. In gravida, tortor in semper consectetur, nulla
              elit tempor arcu, non accumsan nisi dui convallis mi. Pellentesque
              vitae lacus posuere, vestibulum metus sed, aliquam sapien.
              Maecenas et feugiat eros. Pellentesque sed fermentum sapien, eu
              sagittis arcu. Morbi vestibulum massa quis cursus viverra. In id
              massa nec metus molestie luctus vel eu libero. Quisque non leo id
              nisl efficitur ullamcorper sit amet pretium tellus.
            </Typography>
          </ThemeProvider>
        </div>
        <PillButton
          text="Learn More.."
          bgColor={theme.palette.primary.light}
          bgColorHover={theme.palette.primary.main}
          textColor={theme.palette.common.white}
          padding={theme.spacing(1, 4)}
          isFullWidth={false}
        />
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(20),
    textAlign: "right",
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "flex-end",
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(15),
    },
  },
  maxWidth: {
    maxWidth: 600,
  },
  headerH5: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "2rem",
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.light,
  },
  bodyText: {
    fontSize: ".8rem",
    lineHeight: "24px",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(5),
  },
}));

export default LandingPage;
