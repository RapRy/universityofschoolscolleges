import React from "react";
import { makeStyles, Grid, Box, useTheme } from "@material-ui/core";

const EventSkel = () => {
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
          <Box
            width={theme.spacing(5)}
            height={theme.spacing(5)}
            className={`${classes.background} ${classes.radius10}`}
          />
        </Grid>
        <Grid item xs={10}>
          <Box
            width="100%"
            height={theme.spacing(19)}
            className={`${classes.background} ${classes.radius10}`}
          />
        </Grid>
      </Grid>
      <div>
        <Box
          width={theme.spacing(25)}
          height={theme.spacing(4)}
          margin={theme.spacing(0, 1, 1)}
          className={`${classes.background} ${classes.radius5}`}
        />
        <Box
          width={theme.spacing(23)}
          height={theme.spacing(3)}
          className={`${classes.background} ${classes.radius5}`}
          margin={theme.spacing(0, 1, 3)}
        />
        <Box margin={theme.spacing(0, 0, 2)}>
          <Box
            width={theme.spacing(15)}
            height={theme.spacing(2)}
            className={`${classes.background} ${classes.radius5}`}
            margin={theme.spacing(0, 1, 1)}
            display="inline-block"
          />
          <Box
            width={theme.spacing(15)}
            height={theme.spacing(2)}
            className={`${classes.background} ${classes.radius5}`}
            margin={theme.spacing(0, 1, 1)}
            display="inline-block"
          />
        </Box>
        <Box margin={theme.spacing(0, 1)}>
          <Box
            width="100%"
            height={theme.spacing(2)}
            className={`${classes.background} ${classes.radius5}`}
            margin={theme.spacing(0, 0, 1)}
          />
          <Box
            width="100%"
            height={theme.spacing(2)}
            className={`${classes.background} ${classes.radius5}`}
            margin={theme.spacing(0, 0, 1)}
          />
          <Box
            width="85%"
            height={theme.spacing(2)}
            className={`${classes.background} ${classes.radius5}`}
            margin={theme.spacing(0, 0, 4)}
          />
        </Box>
        <Box width="70%" marginLeft="15%" height={theme.spacing(7)} borderRadius={theme.spacing(20)} className={`${classes.background}`} />
      </div>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  "@keyframes anim": {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: .3
    },
    '100%': {
      opacity: 1
    }
  },
  background: {
    background: theme.palette.grey.A100,
    opacity: 1,
    animation: "$anim 2000ms linear infinite",
  },
  radius5: {
    borderRadius: 5,
  },
  radius10: {
    borderRadius: theme.shape.borderRadius,
  },
  padding: {
    padding: theme.spacing(0, 1),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0, 2),
    },
  },
  gridContainer: {
    marginBottom: theme.spacing(2),
  },
}));

export default EventSkel;
